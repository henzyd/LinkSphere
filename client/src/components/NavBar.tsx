import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/bs";
import { HiHome } from "react-icons/hi2";
import Logo from "./Logo";

const NavBar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <nav className="grid items-center justify-between p-4 gap-4 grid-cols-[min-content,1fr,min-content] bg-white sticky top-0 z-50 shadow">
      <div className="w-[8rem]">
        <Logo className=" TabletAndBelow:w-[7rem]" />
      </div>

      <div className="flex items-center gap-6 w-[70%] mx-auto">
        <form
          className={`flex items-center gap-2 focus:border rounded-md bg-[#EEEEEE] border border-transparent transition duration-200 ${
            isSearchFocused ? "border border-[#BDBDBD]" : ""
          } cursor-text`}
          method="GET"
        >
          <FiSearch className=" ml-3 text-xl text-IconColor" />
          <input
            placeholder="Search..."
            className={`outline-0 w-[300px] bg-transparent py-2 px-2 text-sm border-l border-transparent transition duration-200 ${
              isSearchFocused
                ? "border-[#BDBDBD] bg-white rounded-tr-md rounded-br-md"
                : ""
            }`}
            type="text"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
        </form>
        <Tooltip title="Home" arrow>
          <IconButton>
            <HiHome className="text-2xl text-IconColor" />
          </IconButton>
        </Tooltip>
      </div>

      <div className="flex items-center gap-4 pr-6">
        <Tooltip title="Notification" arrow>
          <IconButton>
            <IoMdNotificationsOutline className="text-2xl text-IconColor" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Profile" arrow>
          <IconButton>
            <BsFillPersonFill className="text-2xl text-IconColor" />
          </IconButton>
        </Tooltip>
      </div>
    </nav>
  );
};

export default NavBar;
