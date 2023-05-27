const LazyLoader = () => {
  return (
    <div className=" min-h-[60vh] flex justify-center flex-col items-center">
      {/* <span
        className="Loader"
        style={{
          width: "48px",
          height: "48px",
          display: "inline-block",
          position: "relative",
          border: "3px solid",
          borderColor: "#de3500 #0000 #fff #0000",
          borderRadius: "50%",
          boxSizing: "border-box",
          animation: "1s rotate linear infinite",
        }}
      ></span> */}
      <span className="loader inline-block w-48 h-48 relative border-3 border-[#de3500 #0000 #fff #0000] rounded-full animate-rotate">
        <span className="absolute top-0 left-0 w-0 h-0 border-10 border-transparent border-b-[#fff] transform translate-x-[-10px] translate-y-[19px] rotate-[-35deg]"></span>
        <span className="absolute top-0 left-0 w-0 h-0 border-10 border-transparent border-b-[#de3500 #0000 #0000 #0000] transform translate-x-[32px] translate-y-[3px] rotate-[-35deg]"></span>
      </span>
      {/* <p className=" text-CustomBlue dark:text-white font-medium text-lg">
        Loading...
      </p> */}
    </div>
  );
};

export default LazyLoader;
