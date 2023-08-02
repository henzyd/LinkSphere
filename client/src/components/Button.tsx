import { Button as MuiButton, ButtonProps } from "@mui/material";

interface ButtonPropsType extends ButtonProps {
  children: React.ReactNode;
  loading?: boolean;
}

const Button: React.FC<ButtonPropsType> = ({
  children,
  color,
  variant,
  startIcon,
  endIcon,
  disabled,
  loading,
  type,
  className,
  onClick,
}) => {
  const classNameStyles: ButtonProps["className"] = `flex justify-center items-center !text-xs LaptopAndAbove:!text-sm !p-3 !rounded-md !px-5 !text-white MediumPhones:!p-2 MediumPhones:!py-[0.85rem] MediumPhones:!px-3 MediumPhones:!rounded MediumPhones:!text-xs`;

  if (loading) {
    return (
      <MuiButton
        variant={variant || "contained"}
        color={color || "primary"}
        className={`${classNameStyles} ${className} !py-[0.35rem] opacity-40 !cursor-not-allowed`}
        startIcon={
          <figure className="w-10 text">
            <img
              src="https://res.cloudinary.com/dkok98flj/image/upload/v1690825662/other-assets/wired-outline-332-loader-3_yrfrqx.gif"
              alt="loading"
              className="w-full h-full object-contain "
            />
          </figure>
        }
        type={"button"}
        sx={{
          "& .MuiTouchRipple-root": {
            display: "none",
          },
          boxShadow: "none !important",
          // textTransform: "none !important",
        }}
      >
        Loading...
      </MuiButton>
    );
  } else {
    return (
      <MuiButton
        variant={variant || "contained"}
        color={color || "primary"}
        className={`${classNameStyles} ${className} `}
        startIcon={startIcon || null}
        endIcon={endIcon || null}
        disabled={disabled || false}
        type={type || "button"}
        onClick={onClick}
      >
        <>{children}</>
      </MuiButton>
    );
  }
};

export default Button;
