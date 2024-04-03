import axios from "axios";

export const getDust = async () => {
  const KEY = process.env.NEXT_PUBLIC_DUST_API_KEY;
  const response = axios.get(
    `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey=${KEY}&returnType=json&stationName=종로구&dataTerm=month`
  );
  return response;
};
