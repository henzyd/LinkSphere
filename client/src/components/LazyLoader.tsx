const LazyLoader = () => {
  return (
    <div className=" min-h-[60vh] flex justify-center flex-col items-center">
      <span
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
      ></span>
      {/* <p className=" text-CustomBlue dark:text-white font-medium text-lg">
        Loading...
      </p> */}
    </div>
  );
};

export default LazyLoader;
