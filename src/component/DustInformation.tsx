"use client";
import { getDust, getDustStation } from "@/api/DustAPI";
import { getTmCoord } from "@/api/AddressAPI";
import { useEffect, useState } from "react";
import { useGeoLocation } from "@/hook/useGeolocation";
import {
  FaFaceLaughSquint,
  FaFaceLaugh,
  FaFaceMeh,
  FaFaceTired,
} from "react-icons/fa6";

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};
type tmType = {
  x: number;
  y: number;
};
interface DustInfoType {
  dataTime: string;
  pm10Value: number;
  pm10Grade: number;
  pm25Value: number;
  pm25Grade: number;
}
const DustInformation = () => {
  const [tmCoord, setTmCoord] = useState<tmType>();
  const [dustStation, setDustStation] = useState<string>();
  const [dustInfo, setDustInfo] = useState<DustInfoType>();
  const { location, error } = useGeoLocation(geolocationOptions);

  //TM좌표계변환
  useEffect(() => {
    if (location) {
      const data = {
        longitude: location.longitude,
        latitude: location.latitude,
      };
      getTmCoord(data)
        .then((response) => {
          setTmCoord(response.data.documents[0]);
        })
        .catch((error) => console.log(error));
    }
  }, [location]);

  //측정소 위치 불러오기
  useEffect(() => {
    if (tmCoord) {
      const data = {
        x: tmCoord.x,
        y: tmCoord.y,
      };
      getDustStation(data)
        .then((response) => {
          setDustStation(response.data.response.body.items[0].stationName);
        })
        .catch((error) => console.log(error));
    }
  }, [tmCoord]);

  //미세먼지 정보 불러오기
  useEffect(() => {
    if (dustStation) {
      getDust(dustStation)
        .then((response) => {
          setDustInfo(response.data.response.body.items[0]);
        })
        .catch((error) => console.log(error));
    }
  }, [dustStation]);

  const emtions = (num: number) => {
    if (num == 1) {
      return <FaFaceLaughSquint />;
    } else if (num == 2) {
      return <FaFaceLaugh />;
    } else if (num == 3) {
      return <FaFaceMeh />;
    } else if (num == 4) {
      return <FaFaceTired />;
    }
  };

  return (
    <div>
      {dustInfo && (
        <>
          <h1>실시간 미세먼지 정보</h1>
          <div>측정일: {dustInfo.dataTime}</div>
          <div>측정소명: {dustStation}</div>
          <div>미세먼지 농도: {dustInfo.pm10Value}</div>
          <div>미세먼지 등급: {emtions(dustInfo.pm10Grade)}</div>
          <div>초미세먼지 농도: {dustInfo.pm25Value}</div>
          <div>초미세먼지 등급: {emtions(dustInfo.pm25Grade)}</div>
        </>
      )}
    </div>
  );
};
export default DustInformation;
