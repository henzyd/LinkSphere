import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import Seo from "../utils/Seo";
import AuthContainer from "../components/AuthContainer";
import Input from "../components/Input";
import Button from "../components/Button";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState({
    value: "",
    error: false,
  });
  const [instructionsSent, setInstructionsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //? Validation
    if (!email.value) {
      setEmail((prev) => ({
        ...prev,
        error: true,
      }));
      return;
    }

    setInstructionsSent(true);
  };

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
        {!instructionsSent ? (
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
              type="text"
              name="email"
              onChange={(e) =>
                setEmail((prev) => ({
                  ...prev,
                  value: e.target.value,
                }))
              }
              value={email.value}
              id="forgot-email-input"
              label={"Email"}
              error={email.error}
              helperText={"Email is required"}
            />
            <Button
              variant="contained"
              color="info"
              type="submit"
              className="w-full !mt-3 !p-4"
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
        ) : (
          <div className="flex flex-col justify-center items-center w-full gap-[0.55rem]">
            <h1 className="text-[1.5rem] font-bold text-center">
              Check your email
            </h1>
            <p className="text-base mb-5 !text-Tertiary flex flex-col items-center">
              We sent a password reset link to <br />{" "}
              <span className="text-xl">{email.value}</span>
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
                  setInstructionsSent(false); //?
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
