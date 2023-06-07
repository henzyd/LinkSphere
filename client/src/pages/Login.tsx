import { useState } from "react";
import { Link } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
import Seo from "../utils/Seo";
import LoginIllustration from "../assets/illustrations/login.png";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  return (
    <>
      <Seo title="Login" description="Login to your LinkSphere account" />
      <main className=" grid grid-cols-2">
        <figure className="w-full p-4 grid place-content-center">
          <img src={LoginIllustration} alt="login-illustration" />
        </figure>
        <form className="flex flex-col justify-center items-center p-8 w-full max-w-[80%] gap-4">
          <h1 className="text-4xl font-bold mb-6">Login into your account</h1>
          <Input
            type="email"
            onChange={(e) =>
              setUserInput((prev) => ({ ...prev, email: e.target.value }))
            }
            value={userInput.email}
            id="login-email-input"
            label={"Email"}
            helperText={"Email is required"}
          />
          <Input
            type="password"
            value={userInput.password}
            onChange={(e) =>
              setUserInput((prev) => ({ ...prev, password: e.target.value }))
            }
            id="login-password-input"
            label={"Password"}
            helperText={
              "Password is required and must be at least 8 characters"
            }
          />
          <div className="flex items-center justify-between w-full">
            <FormControlLabel
              control={
                <Checkbox
                  className=" !border-red-600"
                  onChange={(e) =>
                    setUserInput((prev) => ({
                      ...prev,
                      rememberMe: e.target.checked,
                    }))
                  }
                  checked={userInput.rememberMe}
                />
              }
              label="Remember me"
            />
            <Link to="/forgot-password">
              <p>Forgot your password?</p>
            </Link>
          </div>
          <Button
            variant="contained"
            color="info"
            type="submit"
            className="w-full mt-12"
          >
            Login
          </Button>
        </form>
      </main>
    </>
  );
};

export default Login;
