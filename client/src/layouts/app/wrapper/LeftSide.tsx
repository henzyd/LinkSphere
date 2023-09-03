import { BsChatRightDots } from "react-icons/bs";
import { IoGitPullRequestOutline, IoSettingsOutline } from "react-icons/io5";

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
    <aside className="bg-white flex flex-col rounded-lg overflow-hidden shadow h-fit sticky top-[100px] w-full">
      {data.map((item, index) => (
        <div
          key={index + 1}
          className="bg-transparent px-4 cursor-pointer hover:bg-[#F5F5F5] w-full"
        >
          <div
            className={`flex items-center gap relative justify-center gap-6 py-6 w-full  ${
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

export default LeftSide;
