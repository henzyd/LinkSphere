import { IconButton } from "@mui/material";
import { BiDotsHorizontalRounded, BiLike, BiShareAlt } from "react-icons/bi";
import { LiaCommentDots } from "react-icons/lia";
import Avatar from "../Avatar";

const Post = () => {
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus iat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus.";
  const image =
    "https://res.cloudinary.com/dkok98flj/image/upload/v1634472023/illustrations/undraw_social_friends_nsbv.svg";
  const video =
    "https://res.cloudinary.com/dkok98flj/video/upload/v1634472023/illustrations/undraw_social_friends_nsbv.svg";

  return (
    <div className="bg-white shadow p-6 rounded-lg flex flex-col">
      <div className="flex w-full justify-between mb-4">
        <div className="flex items-center gap-4">
          <Avatar />
          <div>
            <p className="capitalize gap-1 flex items-center text-sm">
              <span>{"surfiya"}</span>
              <span>{"Zakir"}</span>
            </p>
            <p className="text-sm text-[#B0B8BF]">{"2:30pm"}</p>
          </div>
        </div>
        <IconButton>
          <BiDotsHorizontalRounded />
        </IconButton>
      </div>
      <div className="w-full flex flex-col gap-4">
        <p className="text-sm">
          {description.length > 200 ? description.slice(0, 200) + "...see more" : description}
        </p>
        <div className="flex w-full justify-center items-center rounded-md overflow-hidden">
          {video && (
            <video controls className="w-full">
              <source src={video} type="video/mp4" />
            </video>
          )}
          {image && (
            <figure>
              <img src={image} alt="post image" />
            </figure>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between items-center p-2">
          <p className="text-[0.75rem] text-Text-Black2 flex items-center gap-1">
            <span></span>{" "}
            <span className="flex items-center gap-1 capitalize">
              <span>{"Bob"}</span>
              <span>{"Rob"}</span>
            </span>{" "}
            and <span>{"600"}</span> others
          </p>
          <p className="text-[0.75rem] text-Text-Black2">
            <span>{"28"}</span> comments
          </p>
        </div>
        <div className="flex items-center justify-between border-t p-2 pb-0">
          <div className="flex items-center gap-4">
            <IconButton className="!rounded-md flex items-center gap-2">
              <BiLike size={20} />
              <p className="text-sm text-Text-Black2">Like</p>
            </IconButton>
            <IconButton className="!rounded-md flex items-center gap-2">
              <LiaCommentDots size={20} />
              <p className="text-sm text-Text-Black2">Comment</p>
            </IconButton>
          </div>
          <IconButton className="!rounded-md flex items-center gap-2">
            <BiShareAlt size={20} />
            <p className="text-sm text-Text-Black2">Share</p>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Post;
