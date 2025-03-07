"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSearchParams, usePathname, useParams } from "next/navigation";

// dynamic importを使用してMapContainerをクライアントサイドでのみレンダリング
const Map = dynamic(() => import("../../_features/map/index"), {
	ssr: false, // サーバーサイドレンダリングを無効化
});

const MapPage: React.FC = () => {
	let pathname = usePathname();
	const countryId = pathname.replace("/map/", ""); // /mapを削除

	return (
		<div style={{ height: "100vh", width: "100%" }}>
			<div className="flex justify-center text-3xl font-semibold text-[rgba(0,164,150,1)] m-5">
				地図
			</div>
			<Map countryId={countryId as string} />
		</div>
	);
};

export default MapPage;
