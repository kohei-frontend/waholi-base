"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { fetchFacilityById } from "@/app/lib/api";
import { Facility } from "@/app/types";
import SpaceFeature from "@/app/features/space";

export default function Page() {
	const pathname = usePathname();
	const space_id = pathname.split("/").pop(); // URLからspace_idを取得
	const [facilityData, setFacilityData] = useState<Facility>();

	useEffect(() => {
		if (!space_id) return;

		const fetchData = async () => {
			try {
				const data = await fetchFacilityById(space_id);
				setFacilityData(data);
			} catch (error) {
				console.error("Failed to fetch facility data", error);
			}
		};

		fetchData();
	}, [space_id]);

	if (!facilityData) {
		return <div>Loading...</div>;
	}

	return (
		<div className="max-w-2xl mx-auto bg-white">
			<SpaceFeature facilityData={facilityData} />
		</div>
	);
}
