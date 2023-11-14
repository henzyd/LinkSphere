import { TextareaAutosize, IconButton } from "@mui/material";
import { FiEdit } from "react-icons/fi";
import { HiPhoto } from "react-icons/hi2";
import { BsFillPlayBtnFill } from "react-icons/bs";
import Button from "../Button";

const Create = () => {
  return (
    <section
      id="Create"
      className="bg-white flex flex-col rounded-lg overflow-hidden shadow h-fit p-6 w-full gap-4"
    >
      <div className="flex items-center gap-4 pl-2">
        <FiEdit className="text-IconColor text-lg" />
        <h3 className="text-[1rem]">Create a post</h3>
      </div>
      <TextareaAutosize
        aria-label="post-description"
        minRows={5}
        placeholder="What's on your mind?"
        className="outline-0 resize-none w-full border border-gray-300 focus-visible:border-Primary transition border-10000ms ease-out rounded-md text-sm placeholder:text-sm p-2"
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <IconButton className="!rounded-md">
            <span className="flex items-center gap-3">
              <HiPhoto color="green" className="text-[1.6rem]" />
              <p className="text-sm">Photo</p>
            </span>
          </IconButton>
          <IconButton className="!rounded-md">
            <span className="flex items-center gap-3">
              <BsFillPlayBtnFill color="red" className="text-[1.4rem]" />
              <p className="text-sm">Video</p>
            </span>
          </IconButton>
        </div>
        <Button className="!w-fit !px-10" color="primary">
          Post
        </Button>
      </div>
    </section>
  );
};

export default Create;
