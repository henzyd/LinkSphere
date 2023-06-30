import { useState } from "react";
import { Link } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FcGoogle } from "react-icons/fc";
import Seo from "../utils/Seo";
import Input from "../components/Input";
import Button from "../components/Button";
import AuthContainer from "../components/AuthContainer";
import { notifyError, notifySuccess } from "../utils/Toast";

const Login = () => {
  const [userInput, setUserInput] = useState({
    email: {
      value: "",
      error: false,
    },
    password: {
      value: "",
      error: false,
    },
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //? Validation
    if (!userInput.email.value || userInput.password.value.length < 8) {
      setUserInput((prev) => ({
        ...prev,
        email: {
          ...prev.email,
          error: !prev.email.value ? true : false,
        },
        password: {
          ...prev.password,
          error: prev.password.value.length < 8 ? true : false,
        },
      }));
      notifyError("Please fill all the fields correctly");
      return;
    } else {
      setUserInput((prev) => ({
        ...prev,
        email: {
          ...prev.email,
          error: false,
        },
        password: {
          ...prev.password,
          error: false,
        },
      }));
    }

    notifySuccess("Login successful");
  }

  return (
    <>
      <Seo title="Login" description="Login to your LinkSphere account" />
      <AuthContainer
        illustrationImg="https://res.cloudinary.com/dkok98flj/image/upload/v1687641212/illustrations/login_kex2y6.png"
        illustrationImgAlt="login"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center w-full gap-[0.55rem]"
        >
          <h1 className="text-[1.5rem] font-bold mb-2 text-center">
            Login into your account
          </h1>

          <Input
            type="email"
            onChange={(e) =>
              setUserInput((prev) => ({
                ...prev,
                email: {
                  ...prev.email,
                  value: e.target.value,
                },
              }))
            }
            value={userInput.email.value}
            id="login-email-input"
            label={"Email"}
            name="email"
            error={userInput.email.error}
            helperText={"Email is required"}
          />
          <Input
            type={showPassword ? "text" : "password"}
            value={userInput.password.value}
            error={userInput.password.error}
            onChange={(e) =>
              setUserInput((prev) => ({
                ...prev,
                password: {
                  ...prev.password,
                  value: e.target.value.trim(),
                },
              }))
            }
            id="login-password-input"
            label={"Password"}
            name="password"
            helperText={
              "Password is required and must be at least 8 characters"
            }
            endAdornment={
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            }
          />

          <div className="flex items-center justify-between w-full">
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) =>
                    setUserInput((prev) => ({
                      ...prev,
                      rememberMe: e.target.checked,
                    }))
                  }
                  checked={userInput.rememberMe}
                  color="secondary"
                />
              }
              className="text-sm"
              label="Remember me"
            />
            <Link to="/forgot-password">
              <p className=" text-sm">Forgot your password?</p>
            </Link>
          </div>

          <Button
            variant="contained"
            color="info"
            type="submit"
            className="w-full !p-4"
          >
            Login
          </Button>
        </form>
        <p className="text-sm mt-4 self-start">
          Don't have an account?{" "}
          <Link to="/signup" className=" !text-Primary !font-bold">
            Signup
          </Link>
        </p>
        <p className="text-sm mt-4 mb-6">
          Or, Login in with your social account
        </p>
        <Button
          variant="contained"
          color="primary"
          className="flex item-center gap-[1.3rem] !p-3 !px-[0.8rem]"
        >
          <div className="bg-white p-[0.5rem] rounded">
            <FcGoogle className=" text-xl" />
          </div>
          <p className=" !text-white">Login in with Google</p>
        </Button>
      </AuthContainer>
    </>
  );
};

export default Login;
