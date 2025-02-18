export const fetchFacilities = async (params?: { type?: string, wageRange?: [number, number], rating?: number, rentRange?: [number, number] }) => {
  try {
    const queryParams = new URLSearchParams();

    switch (params?.type) {
      case 'WORKPLACE':
        queryParams.append('type', params.type.toString());
        if (params.rating !== undefined && params.rating !== 0) {
          queryParams.append('rating', params.rating.toString());
        }
        if (params.wageRange) {
          queryParams.append('wageMin', params.wageRange[0].toString());
          queryParams.append('wageMax', params.wageRange[1].toString());
        }
        break;
      case 'ACCOMMODATION':
        queryParams.append('type', params.type.toString());
        if (params.rating !== undefined && params.rating !== 0) {
          queryParams.append('rating', params.rating.toString());
        }
        if (params.rentRange) {
          queryParams.append('rentMin', params.rentRange[0].toString());
          queryParams.append('rentMax', params.rentRange[1].toString());
        }
        break;
      default:
        break;
    }

    const response = await fetch(`/api/facilities?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error('データの取得に失敗しました');
    }
    return await response.json();
  } catch (error) {
    console.error('データの取得中にエラーが発生しました:', error);
    throw error;
  }
};