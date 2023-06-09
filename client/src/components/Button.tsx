import { Button as MuiButton, ButtonProps } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

const Button: React.FC<{
  children: React.ReactNode;
  color?: ButtonProps["color"];
  variant?: ButtonProps["variant"];
  startIcon?: ButtonProps["startIcon"];
  endIcon?: ButtonProps["endIcon"];
  disabled?: ButtonProps["disabled"];
  loading?: boolean;
  type?: ButtonProps["type"];
  className?: ButtonProps["className"];
  onClick?: ButtonProps["onClick"];
}> = ({
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
  const classNameStyles: ButtonProps["className"] = `!text-xs LaptopAndAbove:!text-sm !p-3 !rounded-md !px-5 !text-white MediumPhones:!p-2 MediumPhones:!py-[0.85rem] MediumPhones:!px-3 MediumPhones:!rounded MediumPhones:!text-xs`;

  if (loading) {
    return (
      <LoadingButton
        loading
        startIcon={<SaveIcon />}
        className={`${classNameStyles} cursor-not-allowed`}
      >
        <span>Loading...</span>
      </LoadingButton>
    );
  } else {
    return (
      <MuiButton
        variant={variant || "contained"}
        color={color || "primary"}
        className={`${classNameStyles} ${className}`}
        startIcon={startIcon || null}
        endIcon={endIcon || null}
        disabled={disabled || false}
        type={type || "button"}
        onClick={onClick}
      >
        {children}
      </MuiButton>
    );
  }
};

export default Button;
