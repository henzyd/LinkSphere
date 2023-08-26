import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FcGoogle } from "react-icons/fc";
import * as Yup from "yup";
import { useFormik } from "formik";
import Seo from "~/components/Seo";
import Input from "~/components/Input";
import Button from "~/components/Button";
import AuthContainer from "~/components/AuthContainer";
import useLoginMutation from "~/redux/mutations/auth/login";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Email is not valid").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required and must be at least 8 characters"),
  rememberMe: Yup.boolean(),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { login, result } = useLoginMutation();
  const { isLoading } = result;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      await login({
        email: values.email,
        password: values.password,
      });
      navigate("/");
    },
  });

  return (
    <>
      <Seo title="Login" description="Login to your LinkSphere account" />
      <AuthContainer
        illustrationImg="https://res.cloudinary.com/dkok98flj/image/upload/v1687641212/illustrations/login_kex2y6.png"
        illustrationImgAlt="login"
      >
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col justify-center items-center w-full gap-[0.55rem]"
        >
          <h1 className="text-[1.5rem] font-bold mb-2 text-center">
            Login into your account
          </h1>

          <Input
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            id="login-email-input"
            label={"Email"}
            name="email"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null
            }
          />
          <Input
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            onChange={formik.handleChange}
            id="login-password-input"
            label={"Password"}
            name="password"
            helperText={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : null
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
                  onChange={formik.handleChange}
                  checked={formik.values.rememberMe}
                  color="primary"
                  name="rememberMe"
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
            loading={isLoading}
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
