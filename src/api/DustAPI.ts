import axios from "axios";
type tmType = {
  x: number;
  y: number;
};

const KEY = process.env.NEXT_PUBLIC_DUST_API_KEY;
//실시간 미세먼지 정보 가져오기
export const getDust = async (city: string) => {
  const response = await axios.get(
    `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey=${KEY}&returnType=json&stationName=${city}&dataTerm=daily&ver=1.1`
  );
  return response;
};

//근접측정소 목록 조회
export const getDustStation = async (data: tmType) => {
  const response = await axios.get(
    `http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList?serviceKey=${KEY}&returnType=json&tmX=${data.x}&tmY=${data.y}`
  );
  return response;
};

//시도별 실시간 평균정보 조회 상세기능명세
export const getDustSido = async () => {
  const response = await axios({
    method: "GET",
    url: "http://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureLIst",
    params: {
      serviceKey: KEY,
      returnType: "JSON",
      numOfRows: 1,
      pageNo: 1,
      itemCode: "pm10",
      dataGubun: "hour",
    },
  });
  return response;
};
