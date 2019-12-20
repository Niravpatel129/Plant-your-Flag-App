import ad from "./flags/ad.png";
import us from "./flags/us.png";
import ca from "./flags/ca.png";
import zw from "./flags/zw.png";
import za from "./flags/za.png";
import ye from "./flags/ye.png";
import xk from "./flags/xk.png";
import ws from "./flags/ws.png";
import vu from "./flags/vu.png";
import dm from "./flags/dm.png";

const getFlag = (value, param2) => {
  let newValue;
  if (!value) {
    newValue = param2;
  } else {
    newValue = value.CountryCode;
  }
  switch (newValue) {
    case "ad":
      return ad;
    case "us":
      return us;
    case "ca":
      return ca;
    case "zw":
      return zw;
    case "za":
      return za;
    case "ye":
      return ye;
    case "xk":
      return xk;
    case "ws":
      return ws;
    case "vu":
      return vu;
    case "dm":
      return dm;
    default:
      return ad;
  }
};

export default getFlag;
