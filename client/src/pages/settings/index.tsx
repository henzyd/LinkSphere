import { Link } from "react-router-dom";
import { MdAccountCircle, MdPassword } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiChevronRight } from "react-icons/fi";
import Seo from "~/components/Seo";
import { IoLogOutOutline } from "react-icons/io5";
import PageWrapper from "~/components/PageWrapper";

const Settings = () => {
  const data = [
    {
      to: "/update-profile",
      icon: MdAccountCircle,
      title: "Update Profile",
    },
    {
      to: "/change-password",
      icon: MdPassword,
      title: "Change Password",
    },
    {
      to: "/notification",
      icon: IoMdNotificationsOutline,
      title: "Notification",
    },
  ];

  return (
    <>
      <Seo title="Settings" description="Settings page" />
      <PageWrapper>
        <h1 className="text-2xl pl-6 font-bold">Settings</h1>
        <div>
          {data.map((item, index) => (
            <Link
              to={`.${item.to}`}
              key={index + 1}
              className="flex items-center hover:bg-[#F5F5F5] px-6"
            >
              <div className="flex items-center justify-between gap-4 py-4 border-b w-full">
                <div className="flex items-center w-full gap-4">
                  <item.icon className="text-IconColor text-2xl" />
                  <p className="text-Text-Black2 text-base">{item.title}</p>
                </div>
                <FiChevronRight className="text-Text-Black2 text-lg" />
              </div>
            </Link>
          ))}
          <button className="w-full hover:bg-[#F5F5F5] normal-case px-6 flex items-center gap-4 py-4">
            <IoLogOutOutline className="text-IconColor text-2xl" />
            <span className="text-Text-Black2 text-base">Logout</span>
          </button>
        </div>
      </PageWrapper>
    </>
  );
};

export default Settings;
