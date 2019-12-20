import ad from "./flags/ad.png";
import us from "./flags/us.png";
import ca from "./flags/ca.png";

const getFlag = value => {
  switch (value) {
    case "ad":
      return ad;
    case "us":
      return us;
    case "ca":
      return ca;
    default:
      return ad;
  }
};

export default getFlag;
