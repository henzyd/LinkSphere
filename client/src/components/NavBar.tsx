import { Input } from "@mui/material";
import { IoMdNotificationsOutline } from "react-icons/io";
import Logo from "./Logo";

// GoMail;

const NavBar = () => {
  return (
    <div>
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
    </div>
  );
};

export default NavBar;
