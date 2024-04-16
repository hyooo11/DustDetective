"use client";
import { getDust } from "@/api/DustAPI";
import { getAddress } from "@/api/AddressAPI";
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
interface DustInfoType {
  dataTime: string;
  pm10Value: number;
  pm10Grade: number;
  pm25Value: number;
  pm25Grade: number;
}
const DustInformation = () => {
  const [dustInfo, setDustInfo] = useState<DustInfoType>();
  const [city, setCity] = useState<string>("");
  const { location, error } = useGeoLocation(geolocationOptions);
  console.log(city);
  console.log(dustInfo);
  // 도시 이름 불러오기
  useEffect(() => {
    if (location) {
      const data = {
        longitude: location.longitude,
        latitude: location.latitude,
      };
      getAddress(data)
        .then((response) => {
          setCity(response.data.documents[0].region_2depth_name);
        })
        .catch((error) => console.log(error));
    }
  }, [location]);
  //미세먼지 정보 불러오기
  useEffect(() => {
    if (city) {
      getDust(city)
        .then((response) => {
          setDustInfo(response.data.response.body.items[0]);
        })
        .catch((error) => console.log(error));
    }
  }, [city]);

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
          <div>측정위치: {city}</div>
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
