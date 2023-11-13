import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconButton, Checkbox, FormControlLabel } from "@mui/material";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import * as Yup from "yup";
import { Formik } from "formik";
import Seo from "~/components/Seo";
import FormField from "~/components/FormField";
import Button from "~/components/Button";
import AuthWrapper from "~/components/AuthWrapper";
import useLoginMutation from "~/redux/api/auth/login";

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

  const { login } = useLoginMutation();

  return (
    <>
      <Seo title="Login" description="Login to your LinkSphere account" />
      <AuthWrapper
        illustrationImg="https://res.cloudinary.com/dkok98flj/image/upload/v1687641212/illustrations/login_kex2y6.png"
        illustrationImgAlt="login"
      >
        <Formik
          initialValues={{
            email: "",
            password: "",
            rememberMe: false,
          }}
          validationSchema={loginValidationSchema}
          onSubmit={async (values) => {
            await login({
              email: values.email,
              password: values.password,
            });
            navigate("/");
          }}
          validateOnBlur={false}
        >
          {({ handleSubmit, isSubmitting, values, setFieldValue }) => (
            <form
              method="POST"
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center w-full gap-[0.55rem]"
            >
              <h1 className="text-[1.5rem] font-bold mb-2 text-center">Login into your account</h1>
              <div className="flex flex-col gap-4 w-full">
                <FormField
                  id="login-email-input"
                  label="Email Address"
                  required
                  name="email"
                  type="email"
                  data-testid="login-email-input"
                />
                <FormField
                  id="login-password-input"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  required
                  name="password"
                  data-testid="login-password-input"
                  endAdornment={
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </IconButton>
                  }
                />
              </div>
              <div className="flex items-center justify-between w-full">
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        setFieldValue("rememberMe", !values.rememberMe);
                      }}
                      checked={values.rememberMe}
                      color="primary"
                      name="rememberMe"
                    />
                  }
                  className="text-sm"
                  label="Remember me"
                />
                <Link to="/forgot-password" className="hover:underline text-sm">
                  Forgot your password?
                </Link>
              </div>
              <Button
                variant="contained"
                color="info"
                type="submit"
                className="w-full !p-4"
                loading={isSubmitting}
              >
                Login
              </Button>
            </form>
          )}
        </Formik>
        <p className="text-sm mt-4 self-start">
          Don't have an account?{" "}
          <Link to="/signup" className=" !text-Primary !font-bold hover:underline">
            Signup
          </Link>
        </p>
        <p className="text-sm mt-4 mb-6">Or, Login in with your social account</p>
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
      </AuthWrapper>
    </>
  );
};

export default Login;
