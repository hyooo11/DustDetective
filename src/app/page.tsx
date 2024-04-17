"use client";
import DustInformation from "@/component/DustInformation";
// import KoreaMap from "@/component/KoreaMap";
import SeoulMap from "@/component/SeoulMap";

export default function Home() {
  return (
    <div>
      <DustInformation />
      {/* <KoreaMap /> */}
      <SeoulMap />
    </div>
  );
}
