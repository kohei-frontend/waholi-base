export const fetchFacilities = async (
	params?: {
		type?: string;
		wageRange?: [number, number];
		rating?: number;
		rentRange?: [number, number];
	},
	countryId?: string
) => {
	try {
		const queryParams = new URLSearchParams();

		if (countryId) {
			queryParams.append("countryId", countryId);
		}

		// paramsが存在する場合のみクエリパラメータを追加
		if (params) {
			if (params.type) {
				queryParams.append("type", params.type.toString());
			}

			if (params.rating) {
				queryParams.append("rating", params.rating.toString());
			}

			if (params.wageRange) {
				queryParams.append("wageMin", params.wageRange[0].toString());
				queryParams.append("wageMax", params.wageRange[1].toString());
			}

			if (params.rentRange) {
				queryParams.append("rentMin", params.rentRange[0].toString());
				queryParams.append("rentMax", params.rentRange[1].toString());
			}
		}

		const response = await fetch(`/api/facilities?${queryParams.toString()}`);
		if (!response.ok) {
			throw new Error(`データの取得に失敗しました: ${response.statusText}`);
		}
		return await response.json();
	} catch (error) {
		console.error("データの取得中にエラーが発生しました:", error);
		throw error;
	}
};

// 特定のfacility_idに基づいてデータを取得する関数
export const fetchFacilityById = async (facilityId: string) => {
	try {
		const queryParams = new URLSearchParams();
		queryParams.append("facility_id", facilityId.toString());
		const response = await fetch(`/api/facilities?${queryParams.toString()}`);
		if (!response.ok) {
			throw new Error("Failed to fetch facility data");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching facility by ID:", error);
		return null;
	}
};
