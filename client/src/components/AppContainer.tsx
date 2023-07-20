import React from "react";
import { BsChatRightDots } from "react-icons/bs";
import { IoGitPullRequestOutline, IoSettingsOutline } from "react-icons/io5";

interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  return (
    <section
      id="AppContainer"
      className="grid grid-cols-[1fr,3fr,1fr] gap-8 p-7 px-12 h-[inherit] max-w-screen-LargeLaptop mx-auto"
    >
      <LeftSide />
      <main className="flex flex-col">{children}</main>
      <RightSide />
    </section>
  );
};

const LeftSide: React.FC = () => {
  const data = [
    {
      title: "Chats",
      icon: BsChatRightDots,
    },
    {
      title: "Requests",
      icon: IoGitPullRequestOutline,
    },
    {
      title: "Settings",
      icon: IoSettingsOutline,
    },
  ];
  return (
    <aside className="bg-white flex flex-col rounded-lg overflow-hidden shadow h-fit sticky top-[100px]">
      {data.map((item, index) => (
        <div
          key={index + 1}
          className="bg-transparent px-4 cursor-pointer hover:bg-[#F5F5F5]"
        >
          <div
            className={`flex items-center gap relative justify-center gap-6 py-6  ${
              data.length === index + 1 ? "" : "border-b"
            }`}
          >
            <item.icon className="text-[1.3rem] text-IconColor" />
            <p className="text-[0.9rem]">{item.title}</p>
          </div>
        </div>
      ))}
    </aside>
  );
};

const RightSide: React.FC = () => {
  return (
    <aside className="bg-white flex rounded-lg overflow-hidden shadow-md h-fit sticky top-[100px]"></aside>
  );
};

export default AppContainer;
