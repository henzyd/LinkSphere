import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Formik } from "formik";
import * as Yup from "yup";
import Seo from "~/components/Seo";
import AuthContainer from "~/components/AuthContainer";
import Input from "~/components/Input";
import Button from "~/components/Button";

const ValidationSchema = Yup.object().shape({
  email: Yup.string().email("Email is not valid").required("Email is required"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [instructionsSent, setInstructionsSent] = useState({
    value: false,
    email: "",
  });

  return (
    <>
      <Seo
        title="Forgot Password"
        description="Can't remember your password? change it"
      />
      <AuthContainer
        illustrationImg="https://res.cloudinary.com/dkok98flj/image/upload/v1688055933/illustrations/undraw_Forgot_password_re_hxwm_qzq5tj.png"
        illustrationImgAlt="forgot-password"
      >
        {!instructionsSent.value ? (
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={ValidationSchema}
            onSubmit={async (values) => {
              setInstructionsSent({
                value: true,
                email: values.email,
              });
            }}
            validateOnBlur={false}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center w-full gap-[0.55rem]"
              >
                <h1 className="text-[1.5rem] font-bold text-center">
                  Forgot Password?
                </h1>
                <p className="text-base mb-4 !text-Tertiary text-center">
                  No worries, we'll send you reset instructions
                </p>
                <Input
                  type="email"
                  name="email"
                  id="forgot-password-email-input"
                  label="Email Address"
                  required
                  data-testid="forgot-password-email-input"
                />
                <Button
                  variant="contained"
                  color="info"
                  type="submit"
                  className="w-full !mt-3 !p-4"
                  loading={isSubmitting}
                >
                  Reset Password
                </Button>

                <div
                  className="flex items-center cursor-pointer gap-2 mt-4"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  <IoArrowBack />
                  <p className="text-base">Back to login</p>
                </div>
              </form>
            )}
          </Formik>
        ) : (
          <div className="flex flex-col justify-center items-center w-full gap-[0.55rem]">
            <h1 className="text-[1.5rem] font-bold text-center">
              Check your email
            </h1>
            <p className="text-base mb-5 !text-Tertiary flex flex-col items-center">
              We sent a password reset link to <br />{" "}
              <span className="text-xl">{instructionsSent.email}</span>
            </p>
            <Button
              variant="contained"
              color="info"
              type="submit"
              className="w-full !p-4"
            >
              Open email app
            </Button>
            <p className="!text-Tertiary mt-5 text-base">
              Didin't receive the email?{" "}
              <span
                className="!text-Primary cursor-pointer"
                onClick={() => {
                  setInstructionsSent({
                    value: false,
                    email: "",
                  }); //?
                }}
              >
                Click to resend
              </span>
            </p>
            <div
              className="flex items-center cursor-pointer gap-2 mt-4"
              onClick={() => {
                navigate("/login");
              }}
            >
              <IoArrowBack />
              <p className="text-base">Back to login</p>
            </div>
          </div>
        )}
      </AuthContainer>
    </>
  );
};

export default ForgotPassword;
