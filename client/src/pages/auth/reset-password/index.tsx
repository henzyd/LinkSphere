import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Formik } from "formik";
import * as Yup from "yup";
import AuthWrapper from "~/components/AuthWrapper";
import Button from "~/components/Button";
import Seo from "~/components/Seo";
import FormField from "~/components/FormField";
import { useResetPasswordMutation } from "~/redux/api/auth/password";
import NotFound from "~/pages/NotFound";
import Success from "./Success";

const ValidationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("This field is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "New password and confirm password must match")
    .required("This field is required"),
});

const ResetPassword = () => {
  const [searchParams] = useSearchParams();

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const [successDisplay, setSuccessDisplay] = useState(false);

  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  const { resetPassword } = useResetPasswordMutation();

  if (!userId || !token) {
    return <NotFound />;
  }

  return (
    <>
      <Seo title="Reset Password" description="Reset your LinkSphere account password" />
      <AuthWrapper
        illustrationImg="https://res.cloudinary.com/dkok98flj/image/upload/v1688055933/illustrations/undraw_Forgot_password_re_hxwm_qzq5tj.png"
        illustrationImgAlt="forgot-password"
      >
        {successDisplay ? (
          <Success />
        ) : (
          <Formik
            initialValues={{
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={ValidationSchema}
            validateOnBlur={false}
            onSubmit={async (values) => {
              const response = await resetPassword({
                userId,
                token,
                newPassword: values.newPassword,
              });

              if (response) {
                setSuccessDisplay(true);
              }
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center w-full gap-[0.55rem]"
              >
                <h1 className="text-[1.5rem] font-bold text-center MediumPhones:text-lg">
                  Reset Password
                </h1>
                <p className="text-sm mb-4 !text-Tertiary text-center">
                  Please enter your new password
                </p>
                <div className="flex flex-col gap-[1rem] w-full">
                  <FormField
                    name="newPassword"
                    id="reset-new-password-input"
                    label="New Password"
                    type={showPassword.newPassword ? "text" : "password"}
                    required
                    data-testid="reset-new-password-input"
                    endAdornment={
                      <IconButton
                        onClick={() =>
                          setShowPassword((prev) => ({
                            ...prev,
                            newPassword: !prev.newPassword,
                          }))
                        }
                        edge="end"
                      >
                        {showPassword.newPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                      </IconButton>
                    }
                  />
                  <FormField
                    name="confirmPassword"
                    id="reset-confirm-password-input"
                    label="Confirm Password"
                    type={showPassword.confirmPassword ? "text" : "password"}
                    required
                    data-testid="reset-confirm-password-input"
                    endAdornment={
                      <IconButton
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
                </div>
                <Button type="submit" color="info" loading={isSubmitting} className="!mt-6 ">
                  Reset Password
                </Button>
              </form>
            )}
          </Formik>
        )}
      </AuthWrapper>
    </>
  );
};

export default ResetPassword;
