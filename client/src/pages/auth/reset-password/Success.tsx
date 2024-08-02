import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import Congratulation from "~/assets/gifs/congratulation.gif";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center w-full gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-[1.5rem] font-bold text-center MediumPhones:text-lg">
          Password reset successful
        </h1>
        <p className="text-sm !text-Tertiary text-center max-w-sm">
          Your password has been successfully reset.
        </p>
      </div>
      <img
        src={Congratulation}
        className="w-32 h-32 mx-auto mb-5"
        alt="Congratulation gif"
        width="250"
      />
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
}
