import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Seo from "../utils/Seo";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import AuthContainer from "../components/AuthContainer";

const Signup = () => {
  const [userInput, setUserInput] = useState({
    name: {
      value: "",
      error: false,
    },
    email: {
      value: "",
      error: false,
    },
    password: {
      value: "",
      error: false,
    },
    confirmPassword: {
      value: "",
      error: false,
    },
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(userInput);

    //? Validation
    if (
      !userInput.name.value ||
      !userInput.email.value ||
      userInput.password.value.length < 8 ||
      userInput.confirmPassword.value.length < 8
    ) {
      setUserInput((prev) => ({
        ...prev,
        name: {
          ...prev.name,
          error: !prev.name.value ? true : false,
        },
        email: {
          ...prev.email,
          error: !prev.email.value ? true : false,
        },
        password: {
          ...prev.password,
          error: prev.password.value.length < 8 ? true : false,
        },
        confirmPassword: {
          ...prev.confirmPassword,
          error: prev.confirmPassword.value.length < 8 ? true : false,
        },
      }));
      return;
    } else {
      setUserInput((prev) => ({
        ...prev,
        name: {
          ...prev.name,
          error: false,
        },
        email: {
          ...prev.email,
          error: false,
        },
        password: {
          ...prev.password,
          error: false,
        },
        confirmPassword: {
          ...prev.confirmPassword,
          error: false,
        },
      }));
    }
  }

  return (
    <>
      <Seo title="Signup" description="Signup to your LinkSphere account" />
      <AuthContainer
        illustrationImg="https://res.cloudinary.com/dkok98flj/image/upload/v1687641216/illustrations/sign_up_ys1xei.png"
        illustrationImgAlt="signup"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center w-full gap-[0.55rem]"
        >
          <h1 className="text-[1.5rem] font-bold mb-2 text-center">
            Create an account
          </h1>
          <Input
            type="text"
            onChange={(e) =>
              setUserInput((prev) => ({
                ...prev,
                name: {
                  ...prev.name,
                  value: e.target.value,
                },
              }))
            }
            value={userInput.name.value}
            id="login-name-input"
            label={"Name"}
            name="name"
            error={userInput.name.error}
            helperText={"Name is required"}
          />
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
            type={showPassword.password ? "text" : "password"}
            onChange={(e) =>
              setUserInput((prev) => ({
                ...prev,
                password: {
                  ...prev.password,
                  value: e.target.value.trim(),
                },
              }))
            }
            value={userInput.password.value}
            id="login-password-input"
            label={"Password"}
            name="password"
            error={userInput.password.error}
            helperText={
              "Password is required and must be at least 8 characters"
            }
            endAdornment={
              <IconButton
                aria-label="toggle password visibility"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    password: !prev.password,
                  }))
                }
                edge="end"
              >
                {showPassword.password ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            }
          />
          <Input
            type={showPassword.confirmPassword ? "text" : "password"}
            onChange={(e) =>
              setUserInput((prev) => ({
                ...prev,
                confirmPassword: {
                  ...prev.confirmPassword,
                  value: e.target.value.trim(),
                },
              }))
            }
            value={userInput.confirmPassword.value}
            id="login-confirm-password-input"
            label={"Confirm Password"}
            name="confirmPassword"
            error={userInput.confirmPassword.error}
            helperText={
              "Confirm password is required and must be at least 8 characters"
            }
            endAdornment={
              <IconButton
                aria-label="toggle password visibility"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    confirmPassword: !prev.confirmPassword,
                  }))
                }
                edge="end"
              >
                {showPassword.confirmPassword ? (
                  <Visibility />
                ) : (
                  <VisibilityOff />
                )}
              </IconButton>
            }
          />

          <Button
            variant="contained"
            color="info"
            type="submit"
            className="w-full !mt-3 !p-4"
          >
            Signup
          </Button>
        </form>
        <p className="text-sm mt-4 self-start">
          Already have an account?{" "}
          <Link to="/login" className=" !text-Primary !font-bold">
            Login
          </Link>
        </p>
        <p className="text-sm mt-4 mb-6">Or, Signup with your social account</p>
        <Button
          variant="contained"
          color="primary"
          className="flex item-center gap-[1.3rem] !p-3 !px-[0.8rem]"
        >
          <div className="bg-white p-[0.5rem] rounded">
            <FcGoogle className=" text-xl" />
          </div>
          <p className=" !text-white">Signup with Google</p>
        </Button>
      </AuthContainer>
    </>
  );
};

export default Signup;
