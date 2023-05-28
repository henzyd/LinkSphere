import React from "react";
import Logo from "../components/Logo";
import { Button } from "@mui/material";
// import Button from "../components/Button";

const AuthLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      <nav className=" flex items-center justify-between">
        <Logo />
        <div>
          <Button variant="contained" color="primary">
            Login
          </Button>
          <Button>Register</Button>
        </div>
      </nav>
      {children}
    </>
  );
};

export default AuthLayout;
