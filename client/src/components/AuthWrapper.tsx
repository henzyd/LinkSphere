import React from "react";
import { twMerge } from "tailwind-merge";

interface AuthWrapperProps {
  children: React.ReactNode;
  outerParentContainerClassName?: string;
  illustrationImg: string;
  illustrationImgAlt: string;
  parentContainerClassName?: string;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({
  children,
  outerParentContainerClassName = "",
  illustrationImg,
  illustrationImgAlt,
  parentContainerClassName = "",
}) => {
  return (
    <main
      className={twMerge(
        `max-w-[2560px] mx-auto grid grid-cols-2 TabletAndBelow:grid-cols-1 min-h-[inherit] pb-8 w-full flex-auto`,
        outerParentContainerClassName
      )}
    >
      <figure className="w-full p-2 grid place-content-center TabletAndBelow:hidden">
        <img src={illustrationImg} alt={`${illustrationImgAlt}-illustration`} />
      </figure>
      <section
        className={twMerge(
          `max-w-[90%] TabletAndBelow:max-w-none p-4 flex flex-col justify-center items-center w-full TabletAndBelow:p-8 MediumPhones:!p-4 MediumPhones:!pt-8`,
          parentContainerClassName
        )}
      >
        {children}
      </section>
    </main>
  );
};

export default AuthWrapper;
