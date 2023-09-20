import { Avatar as MuiAvatar, AvatarProps as MuiAvatarProps } from "@mui/material";
import { twMerge } from "tailwind-merge";
import { BsFillPersonFill } from "react-icons/bs";

interface AvatarProps extends MuiAvatarProps {
  firstName?: string;
  lastName?: string;
  image?: string;
}

const Avatar = ({ className, image, firstName, lastName, ...props }: AvatarProps) => {
  return (
    <MuiAvatar className={twMerge("", className)} {...props}>
      {(() => {
        if (image) {
          return <img src={image} alt="profile picture" className="w-full h-full object-cover" />;
        } else {
          if (firstName && lastName) {
            return (
              <p className="text-blue flex gap-[2px] [&_span]:text-base">
                <span>{firstName.charAt(0).toUpperCase()}</span>
                <span>{lastName.charAt(0).toUpperCase()}</span>
              </p>
            );
          } else {
            return <BsFillPersonFill className="text-2xl text-stone-400" />;
          }
        }
      })()}
    </MuiAvatar>
  );
};

export default Avatar;
