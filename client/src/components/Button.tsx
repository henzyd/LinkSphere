import { Button as MuiButton } from "@mui/material";

const Button: React.FC<{
  children: React.ReactNode;
  color?: string;
}> = ({ children }) => {
  return <MuiButton className=" bg-purple-700">{children}</MuiButton>;
};

export default Button;
