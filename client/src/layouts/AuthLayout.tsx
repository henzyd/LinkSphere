import React from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const AuthLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      <nav className=" flex items-center justify-between p-8 py-6 MediumPhones:p-4 mb-1">
        <Logo />
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button
              className="MediumPhones:!p-2 MediumPhones:!rounded MediumPhones:!text-xs"
              variant="contained"
              color="info"
            >
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              className="MediumPhones:!p-2 MediumPhones:!rounded MediumPhones:!text-xs"
              variant="contained"
              color="primary"
            >
              Signup
            </Button>
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default AuthLayout;
