import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Seo from "../utils/Seo";
import Input from "../components/Input";
import Button from "../components/Button";
import AuthContainer from "../components/AuthContainer";
import { useSignupMutation } from "../api/queries/authQuery";
import { notifyError, notifySuccess } from "../utils/Toast";

const Signup = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    username: {
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

  const [signup, { isLoading, isSuccess, isError, error }] =
    useSignupMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(userInput);

    //? Validation
    if (
      !userInput.username.value ||
      !userInput.email.value ||
      userInput.password.value.length < 8 ||
      userInput.confirmPassword.value.length < 8
    ) {
      setUserInput((prev) => ({
        ...prev,
        username: {
          ...prev.username,
          error: !prev.username.value ? true : false,
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
        username: {
          ...prev.username,
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

    await signup({
      email: userInput.email.value,
      password: userInput.password.value,
      username: userInput.username.value,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
      notifySuccess("Signup successful, please login");
    }

    if (error) {
      if ("status" in error) {
        if (error.status === 400) {
          notifyError("Signup failed, email or username already exists");
        }
      }
    }
  }, [isSuccess, isError]);

  return (
    <>
      <Seo title="Signup" description="Signup to your LinkSphere account" />
      <AuthContainer
        illustrationImg="https://res.cloudinary.com/dkok98flj/image/upload/v1687641216/illustrations/sign_up_ys1xei.png"
        illustrationImgAlt="signup"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center w-full gap-[1rem]"
        >
          <h1 className="text-[1.5rem] font-bold mb-2 text-center">
            Create an account
          </h1>
          <Input
            type="text"
            onChange={(e) =>
              setUserInput((prev) => ({
                ...prev,
                username: {
                  ...prev.username,
                  value: e.target.value,
                },
              }))
            }
            value={userInput.username.value}
            id="login-name-input"
            label={"Username"}
            name="name"
            error={userInput.username.error}
            helperText={"Username is required"}
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
            loading={isLoading}
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
