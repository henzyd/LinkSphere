import { IoMdNotificationsOutline } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { IconButton, Tooltip } from "@mui/material";
import Logo from "./Logo";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between p-4">
      <Logo className="w-[8rem] TabletAndBelow:w-[7rem]" />

      <div
        className={`flex items-center gap-4 focus:border rounded-md bg-[#EEEEEE] w-[30%] border border-transparent cursor-text`}
      >
        <FiSearch color="green" className=" ml-3 text-[1.4rem]" />
        <input
          placeholder="Search..."
          className=" outline-0  w-[100%] bg-transparent py-2"
          type="text"
        />
      </div>

      <div className="flex items-center gap-4 pr-6">
        <IconButton>
          <Tooltip title="notification">
            <IoMdNotificationsOutline className="text-2xl text-TextBlack" />
          </Tooltip>
        </IconButton>
        <IconButton>
          <Tooltip title="notification">
            <CgProfile className="text-2xl text-TextBlack" />
          </Tooltip>
        </IconButton>
      </div>
    </nav>
  );
};

export default NavBar;
