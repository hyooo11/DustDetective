"use client";
import { getDust } from "@/api/DustAPI";
import { useEffect, useState } from "react";

export default function Home() {
  const [dustInfo, setDustInfo] = useState<any>([]);
  console.log(dustInfo);
  useEffect(() => {
    getDust().then((response) => {
      setDustInfo(response.data.response.body);
    });
  }, []);
  return <div>룰루</div>;
}
