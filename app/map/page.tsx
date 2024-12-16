"use client"

import React from 'react';
import dynamic from 'next/dynamic';

// dynamic importを使用してMapContainerをクライアントサイドでのみレンダリング
const Map = dynamic(() => import('./components/index'), {
  ssr: false, // サーバーサイドレンダリングを無効化
});

const MapPage: React.FC = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
        <div className="flex justify-center text-3xl font-semibold text-[rgba(0,164,150,1)] m-5">地図</div>
      <Map />
    </div>
  );
};

export default MapPage;