import React from "react";
import Logo from "../components/Logo";
// import { Button } from "@mui/material";
import Button from "../components/Button";

const AuthLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      <nav className=" flex items-center justify-between p-8 py-6">
        <Logo />
        <div className="flex items-center gap-4">
          <Button variant="contained" color="info">
            Login
          </Button>
          <Button variant="contained" color="primary">
            Register
          </Button>
        </div>
      </nav>
      {children}
    </>
  );
};

export default AuthLayout;
