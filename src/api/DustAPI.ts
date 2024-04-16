import axios from "axios";

export const getDust = async (city: string) => {
  const KEY = process.env.NEXT_PUBLIC_DUST_API_KEY;
  const response = axios.get(
    `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey=${KEY}&returnType=json&stationName=${city}&dataTerm=daily&ver=1.1`
  );
  return response;
};
