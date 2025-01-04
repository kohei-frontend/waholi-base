"use client"

import React, { useEffect, useRef } from "react";
import maplibregl, { Map } from "maplibre-gl";
import * as pmtiles from 'pmtiles';
import "maplibre-gl/dist/maplibre-gl.css";
// import { fetchPosts } from "@/app/lib/api";

//PMTILESを環境変数で使用
const pmtilesUrl = process.env.NEXT_PUBLIC_PMTILES_URL;

export default function MapComponent() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  // const [posts, setPosts] = useState([]);

  useEffect(() => {
    // const loadPosts = async () => {
    //   const data = await fetchPosts();
    //   setPosts(data);
    // };
    // loadPosts();

    // PMTilesプロトコルを登録
    const protocol = new pmtiles.Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    // Maplibre-GLのインスタンスを作成
    const map = new maplibregl.Map({
      container: mapContainerRef.current as HTMLElement, // 型アサーションを使用してnullを除外
      center: [133.7751, -25.2744], // オーストラリアの中心座標
      zoom: 4, // 初期ズームレベル
      style: {
        version: 8,
        sources: {
          australia: {
            type: "raster",
            tiles: [
              "https://tile.openstreetmap.org/{z}/{x}/{y}.png" // OpenStreetMapのタイルを使用
            ],
            tileSize: 256,
            attribution: "© OpenStreetMap contributors",
          },
            pmtiles: {
                type: "vector",
                url: `pmtiles://${pmtilesUrl}`,
                attribution: "© Your Attribution Here",
            },
        },
        layers: [
            {
              id: "background",
              type: "raster",
              source: "australia", // オーストラリアの地図を背景に設定
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
        ],
    }
    
    });
    const popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    // 地図の初期化が完了した後にレイヤーを追加
    map.once('load', function() {
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
            'line-color': '#000000', // 境界線の色を指定
            'line-width': 1 // 境界線の幅を指定
          }
        });
      });
    });

    // ズームを無効化
    map.scrollZoom.disable();
    map.boxZoom.disable();
    map.doubleClickZoom.disable();
    map.touchZoomRotate.disable();

    // クリックイベントでズームを制御
    map.on('click', (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ['state-layer', 'lga-layer', 'suburb-layer'] // 対象のレイヤーを指定
      });
  
      if (!features.length) return;
  
      const feature = features[0];
      const bounds = new maplibregl.LngLatBounds();
  
      // フィーチャーのジオメトリがPolygonまたはMultiPolygonの場合の座標取得
      const coordinates = feature.geometry.type === 'Polygon'
      ? feature.geometry.coordinates[0]
      : feature.geometry.type === 'MultiPolygon'
      ? feature.geometry.coordinates.flat(2)
      : [];

      // フィーチャーの各座標を境界ボックスに追加
      (coordinates as [number, number][]).forEach((coord) => {
        bounds.extend(coord);
      });
      
      if (feature.layer.id === 'state-layer') {
          // state-layerからクリックしてlga-layerを表示する場合は境界ボックスにズーム
          map.fitBounds(bounds, {
            padding: 10,
            duration: 1000
          });
        } else if(feature.layer.id === 'lga-layer') {
          // lga-layerからクリックしてsuburb-layerを表示する場合はクリックされた箇所を中心にズーム
          map.easeTo({
            center: e.lngLat,
            zoom: 10,
            duration: 1000
          });
        } 
    });

    map.on('mousemove', (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ['state-layer', 'lga-layer', 'suburb-layer'] // 対象のレイヤーを指定
      });
  
      if (!features.length) {
        popup.remove();
        return;
      }
  
      const feature = features[0];
  
      // ポップアップを作成して表示
      popup.setLngLat(e.lngLat)
        .setHTML(`<strong>${feature.layer.id}</strong><br>${JSON.stringify(feature.properties)}`)
        .addTo(map);
    });

    mapRef.current = map;

    // クリーンアップ関数
    return () => {
      map.remove();
    };
  }, []);

  return <div ref={mapContainerRef} className="h-full w-full" />;
}
