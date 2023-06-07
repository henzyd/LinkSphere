import { Link } from "react-router-dom";
import LinkSphereLogo from "../assets/icons/logo.svg";

const Logo = () => {
  return (
    <Link to={"/"}>
      <img className="w-52" src={LinkSphereLogo} alt="linksphere-logo" />
    </Link>
  );
};

export default Logo;
