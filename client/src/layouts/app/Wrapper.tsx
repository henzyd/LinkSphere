import { NavLink } from "react-router-dom";
import { BsChatRightDots } from "react-icons/bs";
import { IoGitPullRequestOutline, IoSettingsOutline } from "react-icons/io5";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const data = [
    {
      title: "Chats",
      icon: BsChatRightDots,
      to: "/chats",
    },
    {
      title: "Requests",
      icon: IoGitPullRequestOutline,
      to: "/requests",
    },
    {
      title: "Settings",
      icon: IoSettingsOutline,
      to: "/settings",
    },
  ];

  return (
    <section
      id="Wrapper"
      className="flex gap-8 p-7 px-12 pb-0 h-[inherit] max-w-screen-LargeLaptop mx-auto relative flex-grow"
    >
      <aside className="bg-white flex flex-col rounded-lg overflow-hidden shadow h-fit sticky top-[100px] w-[250px]">
        {data.map((item, index) => (
          <NavLink
            key={index + 1}
            to={item.to}
            className={({ isActive }) =>
              `bg-transparent px-4 cursor-pointer hover:bg-[#F5F5F5] w-full ${
                isActive && "!bg-[#F5F5F5]"
              }`
            }
          >
            <div
              className={`flex items-center gap relative justify-center gap-6 py-6 w-full ${
                data.length === index + 1 ? "" : "border-b"
              }`}
            >
              <item.icon className="text-[1.3rem] text-IconColor" />
              <p className="text-[0.9rem]">{item.title}</p>
            </div>
          </NavLink>
        ))}
      </aside>
      <main className="flex flex-col w-full">{children}</main>
    </section>
  );
};

export default Wrapper;
