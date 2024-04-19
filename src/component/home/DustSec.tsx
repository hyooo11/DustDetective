import DustInformation from "./DustSec/DustInformation";
import MapView from "../map/MapView";

const DustSec = () => {
  return (
    <div>
      미세먼지
      <MapView />
      <DustInformation />
    </div>
  );
};
export default DustSec;
