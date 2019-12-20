import ad from "./flags/ad.png";
import us from "./flags/us.png";
import ca from "./flags/ca.png";

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
    default:
      return ad;
  }
};

export default getFlag;
