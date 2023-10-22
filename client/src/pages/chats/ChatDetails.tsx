import { useState } from "react";
import { ClickAwayListener, Fade, IconButton, OutlinedInput, Paper, Popper } from "@mui/material";
import { IoArrowBackOutline, IoDocumentTextOutline } from "react-icons/io5";
import { BiMicrophone } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { BiSolidPhotoAlbum } from "react-icons/bi";
import { BsCameraFill } from "react-icons/bs";
import Button from "~/components/Button";

interface ChatDetailsProps {
  goBack: () => void;
  data: any;
}

const ChatDetails = ({ goBack }: ChatDetailsProps) => {
  const [message, setMessage] = useState("");
  const [attachAnchorEl, setAttachAnchorEl] = useState<null | HTMLElement>(null);

  const displayAttach = Boolean(attachAnchorEl);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message) return;
  }

  return (
    <div className="shadow rounded-md rounded-bl-none rounded-br-none bg-white h-[100%] relative flex flex-col overflow-hidden w-[80%] mx-auto">
      <header className="p-2 z-10 grid grid-cols-[1fr,3fr,1fr] items-center border-b bg-white sticky flex-shrink-0">
        <IconButton onClick={goBack} className="w-fit">
          <IoArrowBackOutline size={20} />
        </IconButton>
        <p className="text-center font-bold text-base">{"Henzyd"}</p>
        <div></div>
      </header>
      <div className=" overflow-y-auto bg-ChatBackground h-[calc(100vh-210px)]">
        <div className="flex flex-col gap-2 p-2">
          <div className="flex flex-col gap-2">
            <p className="text-center text-xs text-gray-500">{"Today"}</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-end">
                <div className="flex flex-col gap-1 p-2 rounded-md bg-Primary relative [&_p]:text-white before:w-3 before:h-3 before:absolute before:right-0 before:top-0 before:border-r-[10px] before:border-b-[10px] before:bg-Primary">
                  <p className="text-sm">{"Hello"}</p>
                  <p className="text-xs">{"12:00"}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex flex-col gap-1 p-2 rounded-md bg-white text-black">
                  <p className="text-sm">{"Hi"}</p>
                  <p className="text-xs">{"12:00"}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-center text-xs text-gray-500">{"Yesterday"}</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-end">
                <div className="flex flex-col gap-1 p-2 rounded-md bg-Primary text-white">
                  <p className="text-sm">{"Hello"}</p>
                  <p className="text-xs">{"12:00"}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex flex-col gap-1 p-2 rounded-md bg-gray-100">
                  <p className="text-sm">{"Hi"}</p>
                  <p className="text-xs">{"12:00"}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-center text-xs text-gray-500">{"Yesterday"}</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-end">
                <div className="flex flex-col gap-1 p-2 rounded-md bg-blue-500 text-white">
                  <p className="text-sm">{"Hello"}</p>
                  <p className="text-xs">{"12:00"}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex flex-col gap-1 p-2 rounded-md bg-gray-100">
                  <p className="text-sm">{"Hi"}</p>
                  <p className="text-xs">{"12:00"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full bg-white border-t flex items-center justify-between py-0 p-2 flex-shrink-0">
        <ClickAwayListener onClickAway={() => setAttachAnchorEl(null)}>
          <div>
            <IconButton
              onClick={(e) => setAttachAnchorEl(attachAnchorEl ? null : e.currentTarget)}
              className="w-fit"
            >
              <FiPlus size={20} />
            </IconButton>
            <Popper
              className="!mb-2"
              open={displayAttach}
              anchorEl={attachAnchorEl}
              placement="top-start"
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={200}>
                  <Paper className="w-fit flex justify-start flex-col p-2">
                    <Button className="flex items-center !justify-start gap-2" variant="text">
                      <IoDocumentTextOutline size={18} />
                      <p className="!normal-case">Document</p>
                    </Button>
                    <Button className="flex items-center !justify-start gap-2" variant="text">
                      <BiSolidPhotoAlbum size={20} />
                      <p className="!normal-case">Photo & Video</p>
                    </Button>
                    <Button className="flex items-center !justify-start gap-2" variant="text">
                      <BsCameraFill size={18} />
                      <p className="!normal-case">Camera</p>
                    </Button>
                  </Paper>
                </Fade>
              )}
            </Popper>
          </div>
        </ClickAwayListener>
        <form onSubmit={handleSubmit} className="flex items-center gap-2 p-2 w-full">
          <OutlinedInput
            className="w-full"
            placeholder="Type a message"
            multiline
            maxRows={4}
            size="small"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
        <IconButton>
          <BiMicrophone size={20} />
        </IconButton>
      </footer>
    </div>
  );
};

export default ChatDetails;
