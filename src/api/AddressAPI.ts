import axios from "axios";

export const getAddress = async () => {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
  const response = await axios({
    method: "GET",
    url: `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=127.1432224&y=37.5477314`,
    headers: {
      authorization: `KakaoAK ${REST_API_KEY}`,
    },
  });
  return response;
};
