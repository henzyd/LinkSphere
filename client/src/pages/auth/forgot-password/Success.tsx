import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import Button from "~/components/Button";

interface SuccessProps {
  email: string;
}

const Success: React.FC<SuccessProps> = ({ email }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center w-full gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-[1.5rem] font-bold text-center MediumPhones:text-lg">
          Check your email
        </h1>
        <p className="text-sm !text-Tertiary text-center max-w-sm">
          We sent a password reset link to <span className="font-medium">{email}.</span> If you do
          not receive an email, please check your spam folder
        </p>
      </div>
      <Button
        color="info"
        type="submit"
        className="w-full !p-4"
        onClick={() => {
          window.location.href = "mailto:";
        }}
      >
        Open email app
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
    </div>
  );
};

export default Success;
