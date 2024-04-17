import axios from "axios";
import { timeTransformWithBufferHour } from "@/util/WeatherCoord";
type RsType = {
  lat: number;
  lng: number;
};
const KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export const getWeather = async (coord: RsType) => {
  const [base_date, base_time] = timeTransformWithBufferHour(0.5);
  const response = await axios({
    method: "GET",
    url: "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst",
    params: {
      serviceKey: KEY,
      numOfRows: "10",
      pageNo: "1",
      dataType: "JSON",
      base_date,
      base_time,
      nx: coord.lat,
      ny: coord.lng,
    },
  });
  return response;
};
