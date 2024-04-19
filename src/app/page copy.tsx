"use client";
import DustInformation from "@/component/home/DustSec/DustInformation";
import WeatherInformation from "@/component/WeatherInformation";
import styled from "styled-components";
// import KoreaMap from "@/component/KoreaMap";
import SeoulMap from "@/component/SeoulMap";
import { useGeoLocation } from "@/hook/useGeolocation";

const DustWrap = styled.div`
  display: flex;
  & > div {
    width: 100%;
  }
`;

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

export default function Home() {
  const { location, error } = useGeoLocation(geolocationOptions);
  return (
    <div className="gloval-page">
      <WeatherInformation location={location} />
      <DustWrap>
        <SeoulMap />
        <DustInformation />
      </DustWrap>
      {/* <KoreaMap /> */}
    </div>
  );
}
