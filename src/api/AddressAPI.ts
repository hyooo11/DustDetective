import axios from "axios";

type GeoType = {
  longitude: number;
  latitude: number;
};

export const getTmCoord = async (data: GeoType) => {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
  const response = await axios({
    method: "GET",
    url: `https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${data.longitude}4&y=${data.latitude}&input_coord=WGS84&output_coord=TM`,
    headers: {
      authorization: `KakaoAK ${REST_API_KEY}`,
    },
  });
  return response;
};
