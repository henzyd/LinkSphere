import { Link } from "react-router-dom";
import LinkSphereLogo from "../assets/icons/logo.svg";

interface LogoProps {
  containerClassName?: string;
  className?: string;
}
const Logo: React.FC<LogoProps> = ({ containerClassName, className }) => {
  return (
    <Link to={"/"} className={`w-fit ${containerClassName}`}>
      <img
        className={`w-[10rem] TabletAndBelow:w-[9rem] ${className}`}
        src={LinkSphereLogo}
        alt="linksphere-logo"
      />
    </Link>
  );
};

export default Logo;
