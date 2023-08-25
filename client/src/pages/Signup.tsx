import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import * as Yup from "yup";
import { useFormik } from "formik";
import Seo from "../components/Seo";
import Input from "../components/Input";
import Button from "../components/Button";
import AuthContainer from "../components/AuthContainer";
import { useSignupMutation } from "../redux/queries/auth";
import { notifyError, notifySuccess } from "../components/Toast";

const signupValidationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Email is not valid").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required and must be at least 8 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password and confirm password must match")
    .required("Confirm password is required and must be at least 8 characters"),
});

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const [signup, { isLoading }] = useSignupMutation();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: async (values) => {
      try {
        await signup({
          email: values.email,
          password: values.password,
          username: values.username,
        }).unwrap();
        navigate("/login");
        notifySuccess("Signedup successfully, please login");
      } catch (error: any) {
        if ("status" in error) {
          if (error.status === 400) {
            if (error.data.validationErrors) {
              notifyError(error.data.validationErrors[0].message);
            } else if (error.data.message) {
              const message: string = error.data.message.toLowerCase();
              if (message.includes("duplicate")) {
                if (message.includes("email")) {
                  notifyError("Signup failed, Email already exists");
                } else if (message.includes("username")) {
                  notifyError("Signup failed, Username already exists");
                }
              }
            }
          }
        }
      }
    },
  });

  return (
    <>
      <Seo title="Signup" description="Signup to your LinkSphere account" />
      <AuthContainer
        illustrationImg="https://res.cloudinary.com/dkok98flj/image/upload/v1687641216/illustrations/sign_up_ys1xei.png"
        illustrationImgAlt="signup"
      >
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col justify-center items-center w-full gap-[1rem]"
        >
          <h1 className="text-[1.5rem] font-bold mb-2 text-center">
            Create an account
          </h1>
          <Input
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
            id="login-name-input"
            label={"Username"}
            name="username"
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={
              formik.touched.username && formik.errors.username
                ? formik.errors.username
                : null
            }
          />
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
            type={showPassword.password ? "text" : "password"}
            onChange={formik.handleChange}
            value={formik.values.password}
            id="login-password-input"
            label={"Password"}
            name="password"
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : null
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
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            id="login-confirm-password-input"
            label={"Confirm Password"}
            name="confirmPassword"
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? formik.errors.confirmPassword
                : null
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
