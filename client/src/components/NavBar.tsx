import { Input } from "@mui/material";
import { IoMdNotificationsOutline } from "react-icons/io";
import Logo from "./Logo";

// GoMail;

const NavBar = () => {
  return (
    <nav>
      <Logo />

      <Input
        color="primary"
        disabled={false}
        placeholder=""
        size="small"
        // variant=""
        type="search"
      />

      <div>
        <IoMdNotificationsOutline />
      </div>
    </nav>
  );
};

export default NavBar;
