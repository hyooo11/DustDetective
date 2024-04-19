import Map from "@/component/Map";
import koreaData from "@/util/korea.json";
import { GeoGeometryObjects } from "d3";
import { feature } from "topojson-client";

let korea = JSON.parse(JSON.stringify(koreaData));

const featureData = feature(korea, korea.objects["korea"]);

console.log(featureData);

const MapView = () => {
  return (
    <div>
      <Map />
    </div>
  );
};

export default MapView;
