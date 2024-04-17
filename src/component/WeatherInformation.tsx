"use client";
import { DfsXyConv } from "@/util/WeatherCoord";
import { getWeather } from "@/api/WeatherAPI";
import { useEffect, useState } from "react";

interface ILocation {
  latitude: number;
  longitude: number;
}

type Porps = {
  location: ILocation | undefined;
};

const WeatherInformation = ({ location }: Porps) => {
  const rs = location && DfsXyConv(location.longitude, location.latitude);

  const [weather, setWeather] = useState<any>();
  console.log(weather);
  useEffect(() => {
    if (rs) {
      const coord = {
        lat: rs.lat,
        lng: rs.lng,
      };
      getWeather(coord)
        .then((resonse) => {
          setWeather(resonse);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  return (
    <div>
      <p>초단기예보</p>
    </div>
  );
};
export default WeatherInformation;
