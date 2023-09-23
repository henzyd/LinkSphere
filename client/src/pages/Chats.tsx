import { BsPinAngleFill } from "react-icons/bs";
import Seo from "~/components/Seo";
import Avatar from "~/components/Avatar";
import Button from "~/components/Button";

const Chats = () => {
  const chatData = [{}, {}, {}];

  return (
    <>
      <Seo title="Chats" description="Your list of chats are shown here" />
      <div className="shadow w-full flex-grow bg-white rounded-lg">
        {chatData.length > 0 ? (
          <div className="flex flex-col">
            {chatData.map((item: any, index) => (
              <Button key={index + 1} className="!rounded-none flex flex-col" variant="text">
                <div className="flex items-center gap-4 w-full">
                  <Avatar />
                  <div className="w-full flex flex-col">
                    <div className="w-full flex items-center justify-between gap-2">
                      <h4 className="text-sm font-semibold">{"henzyd"}</h4>
                      <p className={`text-xs ${item?.read && "text-Primary"}`}>{"24:45"}</p>
                    </div>
                    <div className="w-full flex items-center justify-between gap-2">
                      <p className="text-Text-Black2 text-xs">{"lorem ipsum very long text...."}</p>
                      <div className="flex items-center gap-2">
                        {!item?.pined && <BsPinAngleFill size={16} className="text-IconColor" />}
                        {!item?.unread && (
                          <span className="bg-Primary text-white text-[0.6rem] rounded-full p-[4px] min-w-[1rem] h-[1rem] flex items-center justify-center">
                            1
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center m-auto">
            <h3 className="text-2xl">No chats yet</h3>
            <p className="text-sm text-[#B0B8BF]">Your chats will be shown here</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Chats;