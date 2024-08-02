import { Link, Outlet } from "react-router-dom";
import Logo from "~/components/Logo";
import Button from "~/components/Button";

const Auth = () => {
  return (
    <div className="h-screen flex flex-col">
      <nav className=" flex items-center justify-between p-8 py-6 MediumPhones:p-4 mb-1">
        <Logo />
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button
              className="!p-3 MediumPhones:!p-2 MediumPhones:!rounded MediumPhones:!text-xs"
              variant="contained"
              color="info"
            >
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              className="!p-3 MediumPhones:!p-2 MediumPhones:!rounded MediumPhones:!text-xs"
              variant="contained"
              color="primary"
            >
              Signup
            </Button>
          </Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Auth;
