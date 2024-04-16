import axios from "axios";

type GeoType = {
  longitude: number;
  latitude: number;
};

export const getAddress = async (data: GeoType) => {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
  const response = await axios({
    method: "GET",
    url: `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${data.longitude}4&y=${data.latitude}`,
    headers: {
      authorization: `KakaoAK ${REST_API_KEY}`,
    },
  });
  return response;
};
