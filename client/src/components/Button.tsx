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
}> = ({ children, color, variant, startIcon, endIcon, disabled, loading }) => {
  const className: ButtonProps["className"] = `!text-base !p-4 !rounded-lg !px-6`;

  if (loading) {
    return (
      <LoadingButton
        loading
        startIcon={<SaveIcon />}
        className={`${className} cursor-not-allowed`}
      >
        <span>Loading...</span>
      </LoadingButton>
    );
  } else {
    return (
      <MuiButton
        variant={variant || "contained"}
        color={color || "primary"}
        className={`${className}`}
        startIcon={startIcon || null}
        endIcon={endIcon || null}
        disabled={disabled || false}
      >
        {children}
      </MuiButton>
    );
  }
};

export default Button;
