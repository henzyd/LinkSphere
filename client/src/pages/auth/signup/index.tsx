import { useState } from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import * as Yup from "yup";
import { Formik } from "formik";
import useSignupMutation from "~/redux/api/auth/signup";
import Seo from "~/components/Seo";
import FormField from "~/components/FormField";
import Button from "~/components/Button";
import AuthWrapper from "~/components/AuthWrapper";
import Otp from "./Otp";

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
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [signedUp, setSignedUp] = useState<{
    data: {
      email: string;
      username: string;
    } | null;
    status: boolean;
  }>({
    data: null,
    status: false,
  });

  const { signup } = useSignupMutation();

  return (
    <>
      <Seo title="Signup" description="Signup to your LinkSphere account" />
      <AuthWrapper
        illustrationImg="https://res.cloudinary.com/dkok98flj/image/upload/v1687641216/illustrations/sign_up_ys1xei.png"
        illustrationImgAlt="signup"
      >
        {signedUp?.status ? (
          <Otp
            userData={{
              email: signedUp.data?.email || "",
              username: signedUp.data?.username || "",
            }}
          />
        ) : (
          <>
            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={signupValidationSchema}
              onSubmit={async (values) => {
                const data = await signup({
                  username: values.username,
                  email: values.email,
                  password: values.password,
                });

                if (data) {
                  setSignedUp({
                    data: {
                      email: values.email || "",
                      username: values.username || "",
                    },
                    status: true,
                  });
                }
              }}
              validateOnBlur={false}
            >
              {({ handleSubmit, isSubmitting }) => (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col justify-center items-center w-full gap-[1rem]"
                >
                  <h1 className="text-[1.5rem] font-bold mb-2 text-center">Create an account</h1>
                  <FormField
                    id="signup-username-input"
                    data-testid="signup-username-input"
                    label="Username"
                    name="username"
                  />
                  <FormField
                    type="email"
                    required
                    id="signup-email-input"
                    label="Email Address"
                    name="email"
                    data-testid="signup-email-input"
                  />
                  <FormField
                    id="signup-password-input"
                    label="Password"
                    type={showPassword.password ? "text" : "password"}
                    required
                    name="password"
                    className="placeholder:leading-3"
                    data-testid="signup-password-input"
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
                        {showPassword.password ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                      </IconButton>
                    }
                  />
                  <FormField
                    id="signup-confirm-password-input"
                    label="Confirm Password"
                    type={showPassword.confirmPassword ? "text" : "password"}
                    required
                    name="confirmPassword"
                    className="placeholder:leading-3"
                    data-testid="signup-confirm-password-input"
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
                          <AiOutlineEyeInvisible />
                        ) : (
                          <AiOutlineEye />
                        )}
                      </IconButton>
                    }
                  />
                  <Button
                    variant="contained"
                    color="info"
                    type="submit"
                    className="w-full !mt-3 !p-4"
                    loading={isSubmitting}
                  >
                    Signup
                  </Button>
                </form>
              )}
            </Formik>
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
          </>
        )}
      </AuthWrapper>
    </>
  );
};

export default Signup;
