const LazyLoader = () => {
  return (
    <div className=" min-h-[60vh] flex justify-center flex-col items-center">
      {/* <Spin size="large" className="dark:text-white" /> */}
      <p className=" text-CustomBlue dark:text-white font-medium text-lg">
        Loading...
      </p>
    </div>
  );
};

export default LazyLoader;
