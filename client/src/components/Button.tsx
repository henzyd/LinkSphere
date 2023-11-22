import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { twMerge } from "tailwind-merge";

interface ButtonPropsType extends LoadingButtonProps {
  children: React.ReactNode;
  loading?: boolean;
}

const Button: React.FC<ButtonPropsType> = ({
  loading,
  variant = "contained",
  className,
  ...props
}) => {
  return (
    <LoadingButton
      variant={variant}
      className={twMerge(
        `w-full flex justify-center items-center !text-sm !p-4 !rounded-md !px-5 !text-white MediumPhones:!p-2 MediumPhones:!py-[0.85rem] MediumPhones:!px-3 MediumPhones:!rounded MediumPhones:!text-xs`,
        variant === "text" && `!text-Text-Black !normal-case hover:!bg-[#F5F5F5]`,
        loading && `opacity-40 !cursor-not-allowed !shadow-none`,
        `${className}`,
      )}
      {...props}
      loading={loading}
    >
      <>{props.children}</>
    </LoadingButton>
  );
};

export default Button;
