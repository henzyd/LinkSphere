import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import AuthWrapper from "~/components/AuthWrapper";
import Button from "~/components/Button";
import Seo from "~/components/Seo";
import FormField from "~/components/FormField";

const ValidationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required and must be at least 8 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "New password and confirm password must match")
    .required("Confirm password is required and must be at least 8 characters"),
});

const ResetPassword = () => {
  // const { userId, token } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <Seo title="Reset Password" description="Reset your LinkSphere account password" />
      <AuthWrapper
        illustrationImg="https://res.cloudinary.com/dkok98flj/image/upload/v1688055933/illustrations/undraw_Forgot_password_re_hxwm_qzq5tj.png"
        illustrationImgAlt="forgot-password"
      >
        <Formik
          initialValues={{
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={ValidationSchema}
          validateOnBlur={false}
          onSubmit={() => {
            // console.log(values);
            navigate("/login");
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center w-full gap-[0.55rem]"
            >
              <h1 className="text-[1.5rem] font-bold text-center">Reset Password</h1>
              <p className="text-base mb-4 !text-Tertiary text-center">Enter your new password</p>
              <div className="flex flex-col gap-[1rem] w-full">
                <FormField
                  type="password"
                  name="newPassword"
                  id="reset-new-password-input"
                  label="New Password"
                  required
                  data-testid="reset-new-password-input"
                />
                <FormField
                  type="password"
                  name="confirmPassword"
                  id="reset-confirm-password-input"
                  label="Confirm Password"
                  required
                  data-testid="reset-confirm-password-input"
                />
              </div>
              <Button type="submit" color="info" loading={isSubmitting} className="!mt-6 !p-4">
                Reset Password
              </Button>
            </form>
          )}
        </Formik>
      </AuthWrapper>
    </>
  );
};

export default ResetPassword;
