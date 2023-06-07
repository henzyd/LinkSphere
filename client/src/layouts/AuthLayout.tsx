import React from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const AuthLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className=" min-h-screen flex flex-col">
      <nav className=" flex items-center justify-between p-8 py-6">
        <Logo />
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="contained" color="info">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="contained" color="primary">
              Register
            </Button>
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default AuthLayout;
