"use client"

import React, { useEffect, useRef, useState } from "react";
import maplibregl, { Map } from "maplibre-gl";
import * as pmtiles from 'pmtiles';
import "maplibre-gl/dist/maplibre-gl.css";
import { fetchPosts } from "@/app/lib/api";
import { SetPosts, MapContainerRef, MaplibreMap, Posts, Post } from "@/app/types";

// PMTILESを環境変数で使用
const pmtilesUrl = process.env.NEXT_PUBLIC_PMTILES_URL as string;

// マップの背景色を定義
const DEFAULT_FILL_COLOR = '#CCCCCC';
const HIGH_POST_COUNT_COLOR = '#FF0000';
const MEDIUM_POST_COUNT_COLOR = '#FFA500';
const LOW_POST_COUNT_COLOR = '#00FF00';

// 投稿データをロードする関数
const loadPosts = async (setPosts: SetPosts) => {
  // APIから投稿データを取得し、状態を更新する
  const data = await fetchPosts();
  console.log("data", data);
  setPosts(data);
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

  return new maplibregl.Map({
    container: mapContainerRef.current as HTMLElement,
    center: [133.7751, -25.2744],
    zoom: 4,
    style: createMapStyle(pmtilesUrl) as maplibregl.StyleSpecification,
  });
};

// 地図のスタイルを作成する関数
const createMapStyle = (pmtilesUrl: string) => ({
  version: 8,
  sources: {
    australia: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
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
const setupPopup = (map: MaplibreMap, posts: Posts) => {
  const popup = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  map.on('mousemove', (e: { point: maplibregl.Point; lngLat: maplibregl.LngLatLike; }) => handleMouseMove(e, map, popup, posts));

  return popup;
};

// マウス移動時の処理を行う関数
const handleMouseMove = (e: { point: maplibregl.Point; lngLat: maplibregl.LngLatLike; }, map: MaplibreMap, popup: maplibregl.Popup, posts: Posts) => {
  const features = map.queryRenderedFeatures(e.point, {
    layers: ['state-layer', 'lga-layer', 'suburb-layer']
  });
  if (!features.length) {
    popup.remove();
    return;
  }

  const feature = features[0];
  const { matchingPosts, displayName } = getMatchingPostsAndDisplayName(feature, posts);

  if (matchingPosts.length > 0) {
    popup.setLngLat(e.lngLat)
         .setHTML(`<strong>${feature.layer.id}</strong><br>${displayName}<br>Matching Posts: ${matchingPosts.length}`)
         .addTo(map);
  } else {
    popup.remove();
  }
};

// フィーチャーに一致する投稿と表示名を取得する関数
const getMatchingPostsAndDisplayName = (feature: maplibregl.MapGeoJSONFeature, posts: Posts) => {
  let matchingPosts: Post[] = [];
  let displayName = '';

  if (feature.layer.id === 'state-layer') {
    const stateName = feature.properties.STATE_NAME;
    matchingPosts = posts.filter(post => post.state === stateName);
    displayName = stateName;
  } else if (feature.layer.id === 'lga-layer') {
    const lgaName = feature.properties.lga_name.replace(/^\["|"\]$/g, '');
    matchingPosts = posts.filter(post => post.lga === lgaName);
    displayName = lgaName;
  } else if (feature.layer.id === 'suburb-layer') {
    const suburbName = feature.properties.suburb;
    matchingPosts = posts.filter(post => post.suburb === suburbName);
    displayName = suburbName;
  }

  return { matchingPosts, displayName };
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

    if (feature.layer.id === 'state-layer') {
      map.fitBounds(bounds, {
        padding: 10,
        duration: 1000
      });
    } else if (feature.layer.id === 'lga-layer') {
      map.easeTo({
        center: e.lngLat,
        zoom: 10,
        duration: 1000
      });
    }
  });
};

// レイヤーの色を更新する関数
const updateMapLayerColors = (map: MaplibreMap, posts: Posts) => {
  const getColorByPosts = (name: string, type: keyof Post) => {
    const postCount = posts.filter(post => post[type] === name).length;
    return postCount > 40 ? HIGH_POST_COUNT_COLOR : postCount > 8 ? MEDIUM_POST_COUNT_COLOR : postCount > 0 ? LOW_POST_COUNT_COLOR : DEFAULT_FILL_COLOR;
  };

  const createColorMapping = (layerType: keyof Post, formatFn?: (name: string) => string) => {
    return posts.reduce((acc: string[], post) => {
      let name = post[layerType] as string;
      if (formatFn) {
        name = formatFn(name);
      }
      if (!acc.includes(name)) {
        acc.push(name, getColorByPosts(name, layerType));
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
  const [posts, setPosts] = useState<Posts>([]);

  useEffect(() => {
    // 投稿データをロードする
    loadPosts(setPosts);
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // 地図とポップアップを初期化する
    const map = initializeMap(mapContainerRef, mapRef, pmtilesUrl);
    const popup = setupPopup(map, posts);

    const handleMapLoad = () => {
      addLayersToMap(map);
      disableMapZoom(map);
      setupMapClickEvents(map);
    };

    map.once('load', handleMapLoad);

    mapRef.current = map;

    return () => {
      // コンポーネントのクリーンアップ時に地図とポップアップを削除する
      map.remove();
      popup.remove();
    };
  }, [posts]);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    const updateLayerColors = () => {
      // 投稿数に応じた色を更新する
      updateMapLayerColors(map, posts);
    };

    const handleClick = (e: { point: maplibregl.PointLike }) => {
      toggleLayerVisibility(map, e);
      updateLayerColors();
    };

    map.once('styledata', updateLayerColors);
    map.on('click', handleClick);

    return () => {
      // クリックイベントのリスナーを削除する
      map.off('click', handleClick);
    };
  }, [posts]);

  return <div ref={mapContainerRef} className="h-full w-full" />;
}