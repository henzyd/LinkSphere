import { useState } from "react";
import { Link } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Seo from "../utils/Seo";
import LoginIllustration from "../assets/illustrations/login.png";
import Input from "../components/Input";
import Button from "../components/Button";

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
  }

  return (
    <>
      <Seo title="Login" description="Login to your LinkSphere account" />
      <main className=" grid grid-cols-2 h-[inherit] mb-8">
        <figure className="w-full p-4 grid place-content-center">
          <img src={LoginIllustration} alt="login-illustration" />
        </figure>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center p-8 w-full max-w-[80%] gap-4"
        >
          <h1 className="text-4xl font-bold mb-6">Login into your account</h1>

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
                  value: e.target.value,
                },
              }))
            }
            id="login-password-input"
            label={"Password"}
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
