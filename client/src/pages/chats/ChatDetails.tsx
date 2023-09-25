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
    <div className="shadow rounded-md bg-white h-full relative flex flex-col overflow-hidden">
      <header className="p-2 z-10 grid grid-cols-[1fr,3fr,1fr] items-center border-b bg-white sticky">
        <IconButton onClick={goBack} className="w-fit">
          <IoArrowBackOutline size={20} />
        </IconButton>
        <p className="text-center font-bold text-base">{"Henzyd"}</p>
        <div></div>
      </header>
      <div className="flex-grow overflow-y-auto"></div>
      <footer className="w-full bg-white border-t flex items-center justify-between py-0 p-2">
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
