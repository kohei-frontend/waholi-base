import { Facility } from "../types";

export async function fetchFacilities(type?: string, wage?: string, rent?: string, rating?: string) {
  try {
    const queryParams = new URLSearchParams();
    if (type) queryParams.append('type', type);
    if (wage) queryParams.append('wage', wage);
    if (rent) queryParams.append('rent', rent);
    if (rating) queryParams.append('rating', rating);

    const response = await fetch(`/api/facilities?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error('データの取得に失敗しました');
    }
    const data = await response.json() as Facility[]; 
    console.log("results", data);
    return data;
  } catch (error) {
    console.error("データの取得中にエラーが発生しました:", error);
    return [];
  }
}
