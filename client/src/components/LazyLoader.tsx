const LazyLoader = () => {
  return (
    <div className=" min-h-screen flex justify-center flex-col items-center">
      <span className="LazyLoader"></span>
      <p className=" text-black font-medium text-lg TabletAndBelow:text-base TabletAndBelow:mt-2">
        Loading...
      </p>
    </div>
  );
};

export default LazyLoader;
