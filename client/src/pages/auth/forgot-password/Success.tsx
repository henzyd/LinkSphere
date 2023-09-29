import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import Button from "~/components/Button";

interface SuccessProps {
  email: string;
}

const Success: React.FC<SuccessProps> = ({ email }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center w-full gap-[0.55rem]">
      <h1 className="text-[1.5rem] font-bold text-center">Check your email</h1>
      <p className="text-base mb-5 !text-Tertiary flex flex-col items-center">
        We sent a password reset link to <br /> <span className="text-xl">{email}</span>
      </p>
      <Button color="info" type="submit" className="w-full !p-4">
        Open email app
      </Button>
      <p className="!text-Tertiary mt-5 text-base">
        Didin't receive the email?{" "}
        <button className="!text-Primary cursor-pointer">Click to resend</button>
      </p>
      <button
        className="flex items-center cursor-pointer gap-2 mt-4"
        onClick={() => {
          navigate("/login");
        }}
      >
        <IoArrowBack />
        <p className="text-base">Back to login</p>
      </button>
    </div>
  );
};

export default Success;
