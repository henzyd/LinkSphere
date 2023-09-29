import { useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import Button from "~/components/Button";

interface OtpProps {
  userData: {
    email: string;
    username: string;
  };
}

const Otp: React.FC<OtpProps> = ({ userData }) => {
  const [otp, setOtp] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center w-full gap-[0.55rem]">
      <h1 className="text-[1.5rem] font-bold text-center">Enter Code</h1>
      <p className="text-base mb-4 !text-Tertiary text-center">
        We sent a code to {userData.email}
      </p>
      <div className="flex flex-col gap-6 py-4">
        <MuiOtpInput
          value={otp}
          onChange={(value) => {
            setOtp(value);
          }}
          onComplete={() => {
            setIsComplete(true);
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
        <Button color="info" type="submit" className="w-full !p-4 mt-5" disabled={!isComplete}>
          Verify
        </Button>
      </div>
    </div>
  );
};

export default Otp;
