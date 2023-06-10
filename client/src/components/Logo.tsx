import { Link } from "react-router-dom";
import LinkSphereLogo from "../assets/icons/logo.svg";

const Logo = () => {
  return (
    <Link to={"/"}>
      <img
        className="w-[10rem] TabletAndBelow:w-[9rem]"
        src={LinkSphereLogo}
        alt="linksphere-logo"
      />
    </Link>
  );
};

export default Logo;
