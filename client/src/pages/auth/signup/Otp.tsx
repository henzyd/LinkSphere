import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MuiOtpInput } from "mui-one-time-password-input";
import Button from "~/components/Button";
import { useVerifyOtpMutation, useResendOtpMutation } from "~/redux/api/auth/otp";

interface OtpProps {
  userData: {
    email: string;
    username: string;
  };
}

const Otp: React.FC<OtpProps> = ({ userData }) => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const { verifyOtp, result: verifyResult } = useVerifyOtpMutation();
  const { resendOtp } = useResendOtpMutation();

  return (
    <div className="flex flex-col justify-center items-center w-full gap-[0.55rem]">
      <h1 className="text-[1.5rem] font-bold text-center MediumPhones:text-lg">Enter OTP</h1>
      <p className="text-sm mb-4 !text-Tertiary text-center max-w-sm">
        We sent a code to <span className="font-medium">{userData.email}</span> If you do not
        receive an email, please check your spam folder
      </p>
      <div className="flex flex-col gap-6 py-4">
        <MuiOtpInput
          value={otp}
          onChange={(value) => {
            setOtp(value);
            if (value.length === 6) {
              setIsComplete(true);
            } else {
              setIsComplete(false);
            }
          }}
          length={6}
          autoFocus
          validateChar={(char) => {
            return /^\d+$/.test(char);
          }}
          TextFieldsProps={{
            variant: "outlined",
            className: "w-[5rem]",
            label: null,
          }}
        />
        <Button
          color="info"
          type="submit"
          className="w-full !p-4 mt-5"
          disabled={!isComplete}
          onClick={async () => {
            const response = await verifyOtp({
              code: Number(otp),
            });

            if (response) {
              navigate("/login");
            }
          }}
          loading={verifyResult.isLoading}
        >
          Verify
        </Button>
      </div>
      <p className="text-sm">
        Didn't get a code?{" "}
        <button
          className="text-Primary font-semibold text-sm"
          onClick={async () => {
            await resendOtp({
              email: userData.email,
            });
          }}
          data-testid="resend-otp"
        >
          Resend
        </button>
      </p>
    </div>
  );
};

export default Otp;
