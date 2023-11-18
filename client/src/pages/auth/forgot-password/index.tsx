import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Formik } from "formik";
import * as Yup from "yup";
import { useForgotPasswordMutation } from "~/redux/api/auth/password";
import Seo from "~/components/Seo";
import AuthWrapper from "~/components/AuthWrapper";
import FormField from "~/components/FormField";
import Button from "~/components/Button";
import Success from "./Success";

const ValidationSchema = Yup.object().shape({
  email: Yup.string().email("Email is not valid").required("Email is required"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [instructionsSent, setInstructionsSent] = useState({
    value: false,
    email: "",
  });

  const { forgotPassword } = useForgotPasswordMutation();

  return (
    <>
      <Seo title="Forgot Password" description="Can't remember your password? change it" />
      <AuthWrapper
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
              const response = await forgotPassword({
                email: values.email,
              });

              if (response) {
                setInstructionsSent({
                  value: true,
                  email: values.email,
                });
              }
            }}
            validateOnBlur={false}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center w-full gap-[0.55rem]"
              >
                <h1 className="text-[1.5rem] font-bold text-center MediumPhones:text-lg">
                  Forgot Password?
                </h1>
                <p className="text-sm mb-4 !text-Tertiary text-center">
                  No worries, we'll send you reset instructions
                </p>
                <FormField
                  type="email"
                  name="email"
                  id="forgot-password-email-input"
                  label="Email Address"
                  required
                  data-testid="forgot-password-email-input"
                />
                <Button
                  color="info"
                  type="submit"
                  className="w-full !mt-3 !p-4"
                  loading={isSubmitting}
                >
                  Send reset link
                </Button>

                <button
                  className="flex items-center cursor-pointer gap-2 mt-4"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  <IoArrowBack />
                  <p className="text-sm">Back to login</p>
                </button>
              </form>
            )}
          </Formik>
        ) : (
          <Success email={instructionsSent.email} />
        )}
      </AuthWrapper>
    </>
  );
};

export default ForgotPassword;
