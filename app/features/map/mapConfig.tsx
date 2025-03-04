export const mapConfig: {
	[key: string]: {
		name: string;
		pmtilesUrl: string;
		tileUrl: string;
		zoomLevel: number;
		center: [number, number];
		stateZoom: {
			mobile: number;
			desktop: number;
		};
		lgaZoom: {
			mobile: number;
			desktop: number;
		};
		stateProperty: string;
		lgaProperty: string;
		suburbProperty: string;
	};
} = {
	"0ac44860-3b58-96ec-f321-0886bc6b9942": {
		name: "au",
		pmtilesUrl: process.env.NEXT_PUBLIC_AU_PMTILES_URL as string,
		tileUrl: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
		zoomLevel: 4,
		center: [133.7751, -25.2744], // オーストラリアの中心
		stateZoom: { mobile: 8, desktop: 7 },
		lgaZoom: { mobile: 10, desktop: 10 },
		stateProperty: "STATE_NAME",
		lgaProperty: "lga_name",
		suburbProperty: "suburb",
	},
	"8ead2888-19ab-72b4-72da-31f34c2f1263": {
		name: "nz",
		pmtilesUrl: process.env.NEXT_PUBLIC_NZ_PMTILES_URL as string,
		tileUrl: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
		zoomLevel: 4.5,
		center: [174.885971, -40.900557], // ニュージーランドの中心
		stateZoom: { mobile: 7, desktop: 6 },
		lgaZoom: { mobile: 9, desktop: 9 },
		stateProperty: "name",
		lgaProperty: "TA2023_V_1",
		suburbProperty: "name",
	},
	// 他の国を追加する場合はここに設定を追記
};
