interface OtpProps {
  userData: {
    email: string;
    username: string;
  };
}

const Otp: React.FC<OtpProps> = ({ userData }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-[0.55rem]">
      <h1 className="text-[1.5rem] font-bold text-center">Enter Code</h1>
      <p className="text-base mb-4 !text-Tertiary text-center">
        We sent a code to {userData.email}
      </p>
    </div>
  );
};

export default Otp;
