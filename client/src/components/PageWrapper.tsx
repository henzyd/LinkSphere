import { twMerge } from "tailwind-merge";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const PageWrapper = ({ children, className }: PageWrapperProps) => {
  return (
    <div
      className={twMerge(
        `w-[80%] mx-auto bg-white rounded-lg flex flex-col gap-4 shadow py-6 mb-8`,
        `${className || ""}`,
      )}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
