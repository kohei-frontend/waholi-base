"use client"

import React, { useEffect, useRef, useState } from "react";
import maplibregl, { Map } from "maplibre-gl";
import * as pmtiles from 'pmtiles';
import "maplibre-gl/dist/maplibre-gl.css";
import { fetchFacilities } from "@/app/lib/api";
import { MapContainerRef, MaplibreMap, Facilities, Facility, SetFacilities } from "@/app/types";
import { Button } from '@mantine/core';
import ContentsCard from "./contentCard";

// PMTILESを環境変数で使用
const pmtilesUrl = process.env.NEXT_PUBLIC_PMTILES_URL as string;

// マップの背景色を定義
const DEFAULT_FILL_COLOR = '#CCCCCC';
const HIGH_POST_COUNT_COLOR = '#FF0000';
const MEDIUM_POST_COUNT_COLOR = '#FFA500';
const LOW_POST_COUNT_COLOR = '#00FF00';
const tilesUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

// 投稿データをロードする関数
const loadFacilities = async (SetFacilities: SetFacilities) => {
  // APIから投稿データを取得し、状態を更新する
  const data = await fetchFacilities();
  // console.log("data", data);
  SetFacilities(data);
};

// 地図の初期化を行う関数
const initializeMap = (mapContainerRef: MapContainerRef, mapRef: React.MutableRefObject<Map | null>, pmtilesUrl: string) => {
  const map = createMapInstance(mapContainerRef, pmtilesUrl);
  mapRef.current = map;
  return map;
};

// Maplibre-GLのインスタンスを作成する関数
const createMapInstance = (mapContainerRef: MapContainerRef, pmtilesUrl: string) => {
  const protocol = new pmtiles.Protocol();
  maplibregl.addProtocol("pmtiles", protocol.tile);
  const isMobile = window.innerWidth <= 768; 

  return new maplibregl.Map({
    container: mapContainerRef.current as HTMLElement,
    center: [133.7751, -25.2744],
    zoom: isMobile ? 3 : 4, // モバイルの場合はズームレベルを変更
    style: createMapStyle(pmtilesUrl) as maplibregl.StyleSpecification,
  });
};

// 地図のスタイルを作成する関数
const createMapStyle = (pmtilesUrl: string) => ({
  version: 8,
  sources: {
    australia: {
      type: "raster",
      tiles: [tilesUrl],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors",
    },
    pmtiles: {
      type: "vector",
      url: `pmtiles://${pmtilesUrl}`,
      attribution: "© Your Attribution Here",
    },
  },
  layers: createMapLayers(),
});

// 地図のレイヤーを作成する関数
const createMapLayers = () => ([
  {
    id: "background",
    type: "raster",
    source: "australia",
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
]);

// ポップアップを設定する関数
const setupPopup = (map: MaplibreMap, facilities: Facilities) => {
  const popup = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  map.on('mousemove', (e: { point: maplibregl.Point; lngLat: maplibregl.LngLatLike; }) => handleMouseMove(e, map, popup, facilities));

  return popup;
};

// マウス移動時の処理を行う関数
const handleMouseMove = (e: { point: maplibregl.Point; lngLat: maplibregl.LngLatLike; }, map: MaplibreMap, popup: maplibregl.Popup, facilities: Facilities) => {
  const features = map.queryRenderedFeatures(e.point, {
    layers: ['state-layer', 'lga-layer', 'suburb-layer']
  });
  if (!features.length) {
    popup.remove();
    return;
  }

  const feature = features[0];
  // console.log("feature", feature);
  const { matchingFacilities, displayName } = getMatchingFacilitiesAndDisplayName(feature, facilities);

  if (matchingFacilities.length > 0) {
    popup.setLngLat(e.lngLat)
         .setHTML(`<strong>${feature.layer.id}</strong><br>${displayName}<br>Matching Posts: ${matchingFacilities.length}`)
         .addTo(map);
  } else {
    popup.remove();
  }
};

// フィーチャーに一致する投稿と表示名を取得する関数
const getMatchingFacilitiesAndDisplayName = (feature: maplibregl.MapGeoJSONFeature, facilities: Facilities) => {
  let matchingFacilities: Facility[] = [];
  let displayName = '';

  if (feature.layer.id === 'state-layer') {
    const stateName = feature.properties.STATE_NAME;
    matchingFacilities = facilities.filter(facility => facility.state.name === stateName); // 修正
    displayName = stateName;
  } else if (feature.layer.id === 'lga-layer') {
    const lgaName = feature.properties.lga_name.replace(/^\["|"\]$/g, '');
    matchingFacilities = facilities.filter(facility => facility.lga.name === lgaName); // 修正
    displayName = lgaName;
  } else if (feature.layer.id === 'suburb-layer') {
    const suburbName = feature.properties.suburb;
    matchingFacilities = facilities.filter(facility => facility.suburb.name === suburbName); // 修正
    displayName = suburbName;
  }

  return { matchingFacilities, displayName };
};

// 地図にレイヤーを追加する関数
const addLayersToMap = (map: MaplibreMap) => {
  const layers = [
    { id: 'state-line-layer', sourceLayer: 'state' },
    { id: 'lga-line-layer', sourceLayer: 'lga' },
    { id: 'suburb-line-layer', sourceLayer: 'suburb' }
  ];

  layers.forEach(layer => {
    map.addLayer({
      'id': layer.id,
      'type': 'line',
      'source': "pmtiles",
      "source-layer": layer.sourceLayer,
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': '#000000',
        'line-width': 1
      }
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
const setupMapClickEvents = (map: MaplibreMap) => {
  map.on('click', (e: { point: maplibregl.Point, lngLat: maplibregl.LngLat }) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ['state-layer', 'lga-layer', 'suburb-layer']
    });

    if (!features.length) return;

    const feature = features[0];
    const bounds = new maplibregl.LngLatBounds();

    const coordinates = feature.geometry.type === 'Polygon'
      ? feature.geometry.coordinates[0]
      : feature.geometry.type === 'MultiPolygon'
      ? feature.geometry.coordinates.flat(2)
      : [];

    (coordinates as [number, number][]).forEach((coord) => {
      bounds.extend(coord);
    });

    const isMobile = window.innerWidth <= 768; 

    if (feature.layer.id === 'state-layer') {
      map.easeTo({
        center: e.lngLat,
        zoom: isMobile ? 8 : 7, // モバイルの場合はズームレベルを変更
        duration: 1000
      });
    } else if (feature.layer.id === 'lga-layer') {
      map.easeTo({
        center: e.lngLat,
        zoom: isMobile ? 10 : 10, // モバイルの場合はズームレベルを変更
        duration: 1000
      });
    }

  });
};

// レイヤーの色を更新する関数
const updateMapLayerColors = (map: MaplibreMap, facilities: Facilities) => {
  const normalizeName = (name: string) => {
    return name.replace(/\s+/g, '').replace(/[()]/g, '').toLowerCase();
  };
  
  const getColorByFacilities = (name: string, type: keyof Facility) => {
    const normalizedName = normalizeName(name);
    const facilityCount = facilities.filter(facility => {
      if (type === 'state') {
        return normalizeName(facility.state.name) === normalizedName;
      } else if (type === 'lga') {
        return normalizeName(facility.lga.name) === normalizedName;
      } else if (type === 'suburb') {
        return normalizeName(facility.suburb.name) === normalizedName;
      }
      return false;
    }).length;
  
    return facilityCount > 40 ? HIGH_POST_COUNT_COLOR
         : facilityCount > 8 ? MEDIUM_POST_COUNT_COLOR
         : facilityCount > 0 ? LOW_POST_COUNT_COLOR
         : DEFAULT_FILL_COLOR;
  };

  const createColorMapping = (layerType: keyof Facility, formatFn?: (name: string) => string) => {
    return facilities.reduce((acc: string[], facility) => {
      let name = '';
      if (layerType === 'state') {
        name = facility.state.name; // 修正
      } else if (layerType === 'lga') {
        name = facility.lga.name; // 修正
      } else if (layerType === 'suburb') {
        name = facility.suburb.name; // 修正
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

  const stateColorMapping = createColorMapping('state');
  if (stateColorMapping.length > 0) {
    map.setPaintProperty('state-layer', 'fill-color', [
      'match',
      ['get', 'STATE_NAME'],
      ...stateColorMapping,
      DEFAULT_FILL_COLOR
    ]);
  } else {
    map.setPaintProperty('state-layer', 'fill-color', '#CCCCCC');
  }

  const lgaColorMapping = createColorMapping('lga', (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  });

  if (lgaColorMapping.length > 0) {
    map.setPaintProperty('lga-layer', 'fill-color', [
      'match',
      ['get', 'lga_name'],
      ...lgaColorMapping,
      DEFAULT_FILL_COLOR
    ]);
  } else {
    map.setPaintProperty('lga-layer', 'fill-color', '#FF0000');
  }

  const suburbColorMapping = createColorMapping('suburb', (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  });

  if (suburbColorMapping.length > 0) {
    map.setPaintProperty('suburb-layer', 'fill-color', [
      'match',
      ['get', 'suburb'],
      ...suburbColorMapping,
      DEFAULT_FILL_COLOR
    ]);
  } else {
    map.setPaintProperty('suburb-layer', 'fill-color', '#CCCCCC');
  }
};

// レイヤーの表示を切り替える関数
const toggleLayerVisibility = (map: MaplibreMap, e: { point: maplibregl.PointLike }) => {
  const features = map.queryRenderedFeatures(e.point, {
    layers: ['state-layer', 'lga-layer', 'suburb-layer']
  });

  if (!features.length) return;

  const feature = features[0];

  if (feature.layer.id === 'state-layer') {
    map.setLayoutProperty('lga-layer', 'visibility', 'visible');
    map.setLayoutProperty('state-layer', 'visibility', 'none');
  } else if (feature.layer.id === 'lga-layer') {
    map.setLayoutProperty('suburb-layer', 'visibility', 'visible');
    map.setLayoutProperty('lga-layer', 'visibility', 'none');
  }
};

export default function MapComponent() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const [facilities, setFacilities] = useState<Facilities>([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [currentLayer, setCurrentLayer] = useState<string>('州'); // 初期状態を'州'に設定
  const [filteredFacilities, setFilteredFacilities] = useState<Facilities>([]); // フィルタされた投稿を管理する状態を追加


  const resetToInitialLayer = () => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    // レイヤーの表示をリセット
    map.setLayoutProperty('state-layer', 'visibility', 'visible');
    map.setLayoutProperty('lga-layer', 'visibility', 'none');
    map.setLayoutProperty('suburb-layer', 'visibility', 'none');

    // ズームと中心を初期状態に戻す
    const isMobile = window.innerWidth <= 768;
    map.easeTo({
      center: [133.7751, -25.2744], // 初期の中心座標
      zoom: isMobile ? 3 : 4, // 初期のズームレベル
      duration: 1000
    });

    // 現在のレイヤーを初期状態に設定
    setCurrentLayer('州');

    // フィルタされた投稿をリセットして全ての投稿を表示
    setFilteredFacilities(facilities);
  };

  useEffect(() => {
    // 投稿データをロードする
    loadFacilities((data) => {
      setFacilities(data);
      setFilteredFacilities(data); // 初期状態で全データを表示
    });
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // 地図とポップアップを初期化する
    const map = initializeMap(mapContainerRef, mapRef, pmtilesUrl);
    const popup = setupPopup(map, facilities);

    const handleMapLoad = () => {
      addLayersToMap(map);
      disableMapZoom(map);
      setupMapClickEvents(map);
      // 初期状態のレイヤーを表示
      setCurrentLayer('州');
    };

    map.once('load', handleMapLoad);

    mapRef.current = map;

    return () => {
      // コンポーネントのクリーンアップ時に地図とポップアップを削除する
      map.remove();
      popup.remove();
    };
  }, [facilities]);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    const updateLayerColors = () => {
      // 投稿数に応じた色を更新する
      updateMapLayerColors(map, facilities);
    };

    const handleClick = (e: { point: maplibregl.PointLike }) => {
      toggleLayerVisibility(map, e);
      updateLayerColors();

      const features = map.queryRenderedFeatures(e.point, {
        layers: ['state-layer', 'lga-layer', 'suburb-layer']
      });

      if (features.length > 0) {
        const feature = features[0];
        const { matchingFacilities } = getMatchingFacilitiesAndDisplayName(feature, facilities);
        setFilteredFacilities(matchingFacilities); // フィルタされた投稿を状態に設定

        if (feature.layer.id === 'state-layer') {
          setCurrentLayer('地方自治体');
        } else if (feature.layer.id === 'lga-layer') {
          setCurrentLayer('サバーブ');
        } else if (feature.layer.id === 'suburb-layer') {
          setCurrentLayer('サバーブ');
        }
      }
    };

    map.once('styledata', updateLayerColors);
    map.on('click', handleClick);

    return () => {
      // クリックイベントのリスナーを削除する
      map.off('click', handleClick);
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
          <button
            onClick={() => setIsSidebarVisible(false)}
            className="absolute top-2 right-2 bg-gray-200 rounded-full p-1 hover:bg-gray-300"
          >
            ＜
          </button>
          <ContentsCard facilities={filteredFacilities}/> 
        </div>
      )}
  
      {/* メインコンテンツ（右側のコンテンツ） */}
      <div
        className={`bg-gray-50 relative transition-all duration-300 order-1 md:order-none ${
          isSidebarVisible ? "w-auto" : "col-span-full"
        }`}
      >
        <div ref={mapContainerRef} className="h-full w-full relative">
          {!isSidebarVisible && (
            <button
              onClick={() => setIsSidebarVisible(true)}
              className="absolute top-2 left-2 bg-gray-200 rounded-full p-2 hover:bg-gray-300 flex items-center z-10"
            >
              ＞ Show list
            </button>
          )}
          {currentLayer && (
            <Button
              className="absolute bottom-2 right-2"
              variant="filled"
              style={{ zIndex: 1000 }} // z-indexを高く設定
              onClick={resetToInitialLayer} // ボタンをクリックしたときにリセット
            >
              現在のレイヤー: {currentLayer}✖
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}