"use client"

import React, { useEffect, useRef } from "react";
import maplibregl, { Map } from "maplibre-gl";
import * as pmtiles from 'pmtiles';
import "maplibre-gl/dist/maplibre-gl.css";

const PMTILES_URL =
  "https://iasttwggkzozjnbdyfxh.supabase.co/storage/v1/object/public/geojson/australia-data.pmtiles?t=2024-12-16T10%3A23%3A56.118Z"; // PMTilesファイルのURLを設定

export default function MapComponent() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // PMTilesプロトコルを登録
    const protocol = new pmtiles.Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    // Maplibre-GLのインスタンスを作成
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
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
                url: `pmtiles://${PMTILES_URL}`,
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
