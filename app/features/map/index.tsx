"use client";

import React, { useEffect, useRef, useState } from "react";
import maplibregl, { Map } from "maplibre-gl";
import * as pmtiles from "pmtiles";
import "maplibre-gl/dist/maplibre-gl.css";
import { fetchFacilities, fetchFacilityById } from "@/app/lib/api";
import {
	MapContainerRef,
	MaplibreMap,
	Facilities,
	Facility,
	SetFacilities,
	FilterSearch,
} from "@/app/types";
import { Button } from "@mantine/core";
import ContentsCard from "./contentCard";
import FilterModal from "./filterModal";
import { mapConfig } from "./mapConfig";

// マップの背景色を定義
const DEFAULT_FILL_COLOR = "#CCCCCC";
const HIGH_POST_COUNT_COLOR = "#FF0000";
const MEDIUM_POST_COUNT_COLOR = "#FFA500";
const LOW_POST_COUNT_COLOR = "#00FF00";
const DEFAULT_COUNTRY = "0ac44860-3b58-96ec-f321-0886bc6b9942"; //オーストラリア国id

// 投稿データをロードする関数
const loadFacilities = async (
	SetFacilities: SetFacilities,
	setFilteredFacilities: React.Dispatch<React.SetStateAction<Facilities>>,
	params?: { type?: string; wage?: number; rating?: number; rent?: number },
	countryId?: string
) => {
	// APIから投稿データを取得し、状態を更新する
	const data = await fetchFacilities(params, countryId);
	console.log("data", data);
	SetFacilities(data);
	setFilteredFacilities(data); // 追加: フィルタされた投稿を更新
};

// state-layer以外のフィーチャーをハイライトする関数
const highlightFeature = (map: MaplibreMap, feature: maplibregl.MapGeoJSONFeature) => {
	// ハイライトがすでに存在する場合は何もしない
	if (map.getLayer("highlighted-feature")) {
		return;
	}

	// state-layer以外をハイライト対象とする
	if (feature.layer.id === "state-layer") {
		return; // state-layerの場合は何もしない
	}

	// フィーチャーをGeoJSON形式に変換
	const geometry =
		feature.geometry.type === "MultiPolygon"
			? {
					type: "FeatureCollection",
					features: feature.geometry.coordinates.map((coords) => ({
						type: "Feature",
						geometry: {
							type: "Polygon",
							coordinates: coords,
						},
						properties: feature.properties,
					})),
				}
			: feature.toJSON();

	// GeoJSONデータを使用してハイライトレイヤーを追加
	map.addLayer({
		id: "highlighted-feature",
		type: "line",
		source: {
			type: "geojson",
			data: geometry,
		},
		paint: {
			"line-color": "#FF0000",
			"line-width": 3,
		},
	});
};

// ハイライトをクリアする関数
const clearHighlight = (map: MaplibreMap) => {
	if (map.getLayer("highlighted-feature")) {
		map.removeLayer("highlighted-feature");
		map.removeSource("highlighted-feature");
	}
};

// 地図にレイヤーを追加する関数
const addLayersToMap = (map: MaplibreMap) => {
	const layers = [
		{ id: "state-line-layer", sourceLayer: "state" },
		{ id: "lga-line-layer", sourceLayer: "lga" },
		{ id: "suburb-line-layer", sourceLayer: "suburb" },
	];

	layers.forEach((layer) => {
		map.addLayer({
			id: layer.id,
			type: "line",
			source: "pmtiles",
			"source-layer": layer.sourceLayer,
			layout: {
				"line-join": "round",
				"line-cap": "round",
			},
			paint: {
				"line-color": "#000000",
				"line-width": 1,
			},
		});
	});
};

// 地図のズームを無効化する関数
const disableMapZoom = (map: MaplibreMap) => {
	map.scrollZoom.disable();
	map.boxZoom.disable();
	map.doubleClickZoom.disable();
	map.touchZoomRotate.disable();
};

// 地図のクリックイベントを設定する関数
const setupMapClickEvents = (map: MaplibreMap, countryId: string) => {
	const countryConfig = mapConfig[countryId] || mapConfig[DEFAULT_COUNTRY]; // デフォルトはオーストラリア
	const isMobile = window.innerWidth <= 768;

	map.on("click", (e: { point: maplibregl.Point; lngLat: maplibregl.LngLat }) => {
		const features = map.queryRenderedFeatures(e.point, {
			layers: ["state-layer", "lga-layer", "suburb-layer"],
		});

		if (!features.length) return;

		const feature = features[0];
		const bounds = new maplibregl.LngLatBounds();

		const coordinates =
			feature.geometry.type === "Polygon"
				? feature.geometry.coordinates[0]
				: feature.geometry.type === "MultiPolygon"
					? feature.geometry.coordinates.flat(2)
					: [];

		(coordinates as [number, number][]).forEach((coord) => {
			bounds.extend(coord);
		});
		// console.log("feature", feature);

		if (feature.layer.id === "state-layer") {
			map.easeTo({
				center: e.lngLat,
				zoom: isMobile ? countryConfig.stateZoom.mobile : countryConfig.stateZoom.desktop, // 修正
				duration: 1000,
			});
		} else if (feature.layer.id === "lga-layer") {
			map.easeTo({
				center: e.lngLat,
				zoom: isMobile ? countryConfig.lgaZoom.mobile : countryConfig.lgaZoom.desktop, // 修正
				duration: 1000,
			});
		}
	});
};

// レイヤーの色を更新する関数
const updateMapLayerColors = (map: MaplibreMap, facilities: Facilities, countryId: string) => {
	const countryConfig = mapConfig[countryId] || mapConfig[DEFAULT_COUNTRY];

	const normalizeName = (name: string) => {
		return name.replace(/\s+/g, "").replace(/[()]/g, "").toLowerCase();
	};

	const getColorByFacilities = (name: string, type: keyof Facility) => {
		const normalizedName = normalizeName(name);
		const facilityCount = facilities.filter((facility) => {
			if (type === "state") {
				return normalizeName(facility.state.name) === normalizedName;
			} else if (type === "lga") {
				return normalizeName(facility.lga.name) === normalizedName;
			} else if (type === "suburb") {
				return normalizeName(facility.suburb.name) === normalizedName;
			}
			return false;
		}).length;

		return facilityCount > 7
			? HIGH_POST_COUNT_COLOR
			: facilityCount > 2
				? MEDIUM_POST_COUNT_COLOR
				: facilityCount > 0
					? LOW_POST_COUNT_COLOR
					: DEFAULT_FILL_COLOR;
	};

	// 各単語の最初の文字を大文字にする関数
	const capitalizeWords = (name: string) => {
		return name
			.split(" ")
			.map((word, index) => {
				// "of"は小文字のままにする
				if (word.toLowerCase() === "of" && index !== 0) {
					return word.toLowerCase();
				}
				// ハイフンで区切られた単語を大文字にする
				return word
					.split("-")
					.map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
					.join("-");
			})
			.join(" ");
	};

	const createColorMapping = (layerType: keyof Facility, formatFn?: (name: string) => string) => {
		return facilities.reduce((acc: string[], facility) => {
			let name = "";
			if (layerType === "state") {
				name = facility.state.name;
			} else if (layerType === "lga") {
				name = facility.lga.name;
			} else if (layerType === "suburb") {
				name = facility.suburb.name;
			}

			if (formatFn) {
				name = formatFn(name);
			}
			if (!acc.includes(name)) {
				acc.push(name, getColorByFacilities(name, layerType));
			}
			return acc;
		}, []);
	};

	const stateColorMapping = createColorMapping("state", capitalizeWords);
	if (stateColorMapping.length > 0) {
		map.setPaintProperty("state-layer", "fill-color", [
			"match",
			["get", countryConfig.stateProperty],
			...stateColorMapping,
			DEFAULT_FILL_COLOR,
		]);
	} else {
		map.setPaintProperty("state-layer", "fill-color", "#CCCCCC");
	}

	const lgaColorMapping = createColorMapping("lga", capitalizeWords);

	if (lgaColorMapping.length > 0) {
		map.setPaintProperty("lga-layer", "fill-color", [
			"match",
			["get", countryConfig.lgaProperty],
			...lgaColorMapping,
			DEFAULT_FILL_COLOR,
		]);
	} else {
		map.setPaintProperty("lga-layer", "fill-color", "#FF0000");
	}

	const suburbColorMapping = createColorMapping("suburb", capitalizeWords);

	if (suburbColorMapping.length > 0) {
		map.setPaintProperty("suburb-layer", "fill-color", [
			"match",
			["get", countryConfig.suburbProperty],
			...suburbColorMapping,
			DEFAULT_FILL_COLOR,
		]);
	} else {
		map.setPaintProperty("suburb-layer", "fill-color", "#CCCCCC");
	}
};

// レイヤーの表示を切り替える関数
const toggleLayerVisibility = (map: MaplibreMap, e: { point: maplibregl.PointLike }) => {
	const features = map.queryRenderedFeatures(e.point, {
		layers: ["state-layer", "lga-layer", "suburb-layer"],
	});

	if (!features.length) return;

	const feature = features[0];

	if (feature.layer.id === "state-layer") {
		map.setLayoutProperty("lga-layer", "visibility", "visible");
		map.setLayoutProperty("state-layer", "visibility", "none");
	} else if (feature.layer.id === "lga-layer") {
		map.setLayoutProperty("suburb-layer", "visibility", "visible");
		map.setLayoutProperty("lga-layer", "visibility", "none");
	}
};

export default function MapComponent({ countryId }: { countryId: string }) {
	const mapContainerRef = useRef<HTMLDivElement | null>(null);
	const mapRef = useRef<Map | null>(null);
	const [facilities, setFacilities] = useState<Facilities>([]);
	const [isSidebarVisible, setIsSidebarVisible] = useState(true);
	const [currentLayer, setCurrentLayer] = useState<string>("州"); // 初期状態を'州'に設定
	const [filteredFacilities, setFilteredFacilities] = useState<Facilities>([]); // フィルタされた投稿を管理する状態を追加
	const [showFilters, setShowFilters] = useState(false); // フィルターモーダルの表示状態を管理

	const countryConfig = mapConfig[countryId] || mapConfig["au"]; // デフォルトはオーストラリア

	const handleFacilityClick = async (id: string) => {
		try {
			const facilityData = await fetchFacilityById(id); // facilityの情報を取得
			console.log("スペースの詳細データ", facilityData);
			const url = `/space/${id}`; // 動的URLを作成
			window.open(url, "_blank"); // 新しいタブで開く
		} catch (error) {
			console.error("Failed to fetch facility data", error);
		}
	};

	const handleApplyFilters = (filters: FilterSearch) => {
		setShowFilters(false);
		loadFacilities(setFacilities, setFilteredFacilities, filters, countryId); // フィルターを適用してAPIを呼び出す
	};

	const resetToInitialLayer = () => {
		if (!mapRef.current) return;

		const map = mapRef.current;

		// レイヤーの表示をリセット
		map.setLayoutProperty("state-layer", "visibility", "visible");
		map.setLayoutProperty("lga-layer", "visibility", "none");
		map.setLayoutProperty("suburb-layer", "visibility", "none");

		// ズームと中心を初期状態に戻す
		const isMobile = window.innerWidth <= 768;
		map.easeTo({
			center: countryConfig.center,
			zoom: isMobile ? 3 : 4, // 初期のズームレベル
			duration: 1000,
		});

		// 現在のレイヤーを初期状態に設定
		setCurrentLayer("州");

		// フィルタされた投稿をリセットして全ての投稿を表示
		setFilteredFacilities(facilities);
	};

	// 地図の初期化を行う関数
	const initializeMap = (
		mapContainerRef: MapContainerRef,
		mapRef: React.MutableRefObject<Map | null>,
		pmtilesUrl: string,
		countryId: string
	) => {
		const map = createMapInstance(mapContainerRef, pmtilesUrl, countryId);
		mapRef.current = map;
		return map;
	};

	// 地図のレイヤーを作成する関数
	const createMapLayers = (countryId: string) => {
		const countryConfig = mapConfig[countryId] || mapConfig[DEFAULT_COUNTRY]; // デフォルトはオーストラリア

		return [
			{
				id: "background",
				type: "raster",
				source: countryConfig.name, // 動的にソースを設定
			},
			{
				id: "state-layer",
				source: "pmtiles",
				"source-layer": "state",
				type: "fill",
				paint: {
					"fill-color": "#f28cb1",
					"fill-opacity": 0.6,
				},
				minzoom: 0,
				maxzoom: 5,
			},
			{
				id: "lga-layer",
				source: "pmtiles",
				"source-layer": "lga",
				type: "fill",
				paint: {
					"fill-color": "#00bcd4",
					"fill-opacity": 0.6,
				},
				minzoom: 5,
				maxzoom: 9,
			},
			{
				id: "suburb-layer",
				source: "pmtiles",
				"source-layer": "suburb",
				type: "fill",
				paint: {
					"fill-color": "#4caf50",
					"fill-opacity": 0.6,
				},
				minzoom: 9,
				maxzoom: 11,
			},
		];
	};

	// Maplibre-GLのインスタンスを作成する関数
	const createMapInstance = (
		mapContainerRef: MapContainerRef,
		pmtilesUrl: string,
		countryId: string // countryIdを追加
	) => {
		const protocol = new pmtiles.Protocol();
		maplibregl.addProtocol("pmtiles", protocol.tile);
		const isMobile = window.innerWidth <= 768;

		const countryConfig = mapConfig[countryId] || mapConfig[DEFAULT_COUNTRY]; // countryIdに基づいて設定を取得

		return new maplibregl.Map({
			container: mapContainerRef.current as HTMLElement,
			center: countryConfig.center,
			zoom: isMobile ? countryConfig.zoomLevel - 1 : countryConfig.zoomLevel,
			style: createMapStyle(pmtilesUrl, countryId) as maplibregl.StyleSpecification, // countryIdを渡す
		});
	};

	// 地図のスタイルを作成する関数
	const createMapStyle = (pmtilesUrl: string, countryId: string) => ({
		version: 8,
		sources: {
			[countryConfig.name]: {
				type: "raster",
				tiles: [countryConfig.tileUrl],
				tileSize: 256,
				attribution: "© OpenStreetMap contributors",
			},
			pmtiles: {
				type: "vector",
				url: `pmtiles://${pmtilesUrl}`,
				attribution: "© Your Attribution Here",
			},
		},
		layers: createMapLayers(countryId), // countryIdを渡す
	});

	// フィーチャーに一致する投稿と表示名を取得する関数
	const getMatchingFacilitiesAndDisplayName = (
		feature: maplibregl.MapGeoJSONFeature,
		facilities: Facilities,
		countryId: string
	) => {
		let matchingFacilities: Facility[] = [];
		let displayName = "";

		const countryConfig = mapConfig[countryId] || mapConfig[DEFAULT_COUNTRY];

		if (feature.layer.id === "state-layer") {
			const stateName = feature.properties[countryConfig.stateProperty];
			matchingFacilities = facilities.filter((facility) => facility.state.name === stateName); // 修正
			displayName = stateName;
		} else if (feature.layer.id === "lga-layer") {
			const lgaName = feature.properties[countryConfig.lgaProperty].replace(/^\["|"\]$/g, "");
			matchingFacilities = facilities.filter((facility) => facility.lga.name === lgaName); // 修正
			displayName = lgaName;
		} else if (feature.layer.id === "suburb-layer") {
			const suburbName = feature.properties[countryConfig.suburbProperty];
			matchingFacilities = facilities.filter(
				(facility) => facility.suburb.name === suburbName
			); // 修正
			displayName = suburbName;
		}

		return { matchingFacilities, displayName };
	};

	// マウス移動時の処理を行う関数
	const handleMouseMove = (
		e: { point: maplibregl.Point; lngLat: maplibregl.LngLatLike },
		map: MaplibreMap,
		popup: maplibregl.Popup,
		facilities: Facilities
	) => {
		const features = map.queryRenderedFeatures(e.point, {
			layers: ["state-layer", "lga-layer", "suburb-layer"],
		});
		if (!features.length) {
			popup.remove();
			clearHighlight(map);
			return;
		}

		const feature = features[0];
		// console.log("feature", feature);
		const { matchingFacilities, displayName } = getMatchingFacilitiesAndDisplayName(
			feature,
			facilities,
			countryId
		);

		if (matchingFacilities.length > 0) {
			popup
				.setLngLat(e.lngLat)
				.setHTML(`<strong>場所: ${displayName}  [${matchingFacilities.length}件]</strong>`)
				.addTo(map);

			highlightFeature(map, feature);
		} else {
			popup.remove();
			clearHighlight(map);
		}
	};

	// ポップアップを設定する関数
	const setupPopup = (map: MaplibreMap, facilities: Facilities) => {
		const popup = new maplibregl.Popup({
			closeButton: false,
			closeOnClick: false,
		});

		map.on("mousemove", (e: { point: maplibregl.Point; lngLat: maplibregl.LngLatLike }) =>
			handleMouseMove(e, map, popup, facilities)
		);

		return popup;
	};

	useEffect(() => {
		// 投稿データをロードする
		loadFacilities(setFacilities, setFilteredFacilities, undefined, countryId); // 初期状態で全データを表示
	}, []);

	useEffect(() => {
		if (!mapContainerRef.current) return;

		// 地図とポップアップを初期化する
		const map = initializeMap(mapContainerRef, mapRef, countryConfig.pmtilesUrl, countryId);

		const handleMapLoad = () => {
			addLayersToMap(map);
			disableMapZoom(map);
			setupMapClickEvents(map, countryId);
			// 初期状態のレイヤーを表示
			setCurrentLayer("州");

			// スタイルが読み込まれた後にmousemoveイベントを設定
			const popup = setupPopup(map, facilities);
			map.on("mousemove", (e: { point: maplibregl.Point; lngLat: maplibregl.LngLatLike }) =>
				handleMouseMove(e, map, popup, facilities)
			);
		};

		map.once("load", handleMapLoad);

		mapRef.current = map;

		return () => {
			// コンポーネントのクリーンアップ時に地図とポップアップを削除する
			map.remove();
		};
	}, [facilities, countryId]);

	useEffect(() => {
		if (!mapRef.current) return;

		const map = mapRef.current;

		const updateLayerColors = () => {
			// 投稿数に応じた色を更新する
			updateMapLayerColors(map, facilities, countryId);
		};

		const handleClick = (e: { point: maplibregl.PointLike }) => {
			toggleLayerVisibility(map, e);
			updateLayerColors();

			const features = map.queryRenderedFeatures(e.point, {
				layers: ["state-layer", "lga-layer", "suburb-layer"],
			});

			if (features.length > 0) {
				const feature = features[0];
				const { matchingFacilities } = getMatchingFacilitiesAndDisplayName(
					feature,
					facilities,
					countryId
				);
				setFilteredFacilities(matchingFacilities); // フィルタされた投稿を状態に設定

				if (feature.layer.id === "state-layer") {
					setCurrentLayer("地方自治体");
				} else if (feature.layer.id === "lga-layer") {
					setCurrentLayer("サバーブ");
				} else if (feature.layer.id === "suburb-layer") {
					setCurrentLayer("サバーブ");
				}
			}
		};

		map.once("styledata", updateLayerColors);
		map.on("click", handleClick);

		return () => {
			// クリックイベントのリスナーを削除する
			map.off("click", handleClick);
		};
	}, [facilities]);

	return (
		<div
			className={`grid h-screen transition-all duration-300 ${
				isSidebarVisible
					? "grid-rows-[1fr,1fr] md:grid-cols-[1fr,1fr] md:grid-rows-none"
					: "grid-rows-[1fr] md:grid-cols-[1fr]"
			}`}
		>
			{/* サイドバー（左側のコンテンツ） */}
			{isSidebarVisible && (
				<div className="overflow-auto relative order-2 md:order-none">
					<ContentsCard
						facilities={filteredFacilities}
						onFacilityClick={handleFacilityClick}
					/>
				</div>
			)}

			{/* メインコンテンツ（右側のコンテンツ） */}
			<div
				className={`bg-gray-50 relative transition-all duration-300 order-1 md:order-none ${
					isSidebarVisible ? "w-auto" : "col-span-full"
				}`}
			>
				<div ref={mapContainerRef} className="h-full w-full relative">
					<div className="absolute top-2 left-0 right-0 z-10 flex justify-between px-4">
						{isSidebarVisible ? (
							<button
								onClick={() => setIsSidebarVisible(false)}
								className="bg-white rounded-full p-2 hover:bg-gray-300 flex items-center"
							>
								＜
							</button>
						) : (
							<button
								onClick={() => setIsSidebarVisible(true)}
								className="bg-white rounded-full p-2 hover:bg-gray-300 flex items-center"
							>
								＞ Show list
							</button>
						)}
						<button
							onClick={() => setShowFilters(true)}
							className="bg-white px-4 py-2 rounded-lg shadow"
						>
							Show Filters
						</button>
						<Button
							className="bg-white px-4 py-2 rounded-lg shadow"
							style={{ zIndex: 1000, borderRadius: "32px" }}
							onClick={resetToInitialLayer}
						>
							{currentLayer}✖
						</Button>
					</div>
					<FilterModal
						isOpen={showFilters}
						onClose={() => setShowFilters(false)}
						onApply={handleApplyFilters}
					/>
				</div>
			</div>
		</div>
	);
}
