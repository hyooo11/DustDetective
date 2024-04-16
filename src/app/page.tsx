"use client";
import { getDust } from "@/api/DustAPI";
import { getAddress } from "@/api/AddressAPI";
import { useEffect, useState } from "react";
import { useGeoLocation } from "@/hook/useGeolocation";

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

export default function Home() {
  const [dustInfo, setDustInfo] = useState<any>([]);
  const [city, setCity] = useState<any>();
  const { location, error } = useGeoLocation(geolocationOptions);
  console.log(city);
  useEffect(() => {
    getDust().then((response) => {
      setDustInfo(response.data.response.body);
    });
  }, []);

  useEffect(() => {
    getAddress().then((response) => {
      setCity(response);
    });
  }, []);
  return (
    <div>
      <div>{location && location.longitude}</div>
      <div>{location && location.latitude}</div>
    </div>
  );
}
