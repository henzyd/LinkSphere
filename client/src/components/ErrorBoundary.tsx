import { useRouteError } from "react-router-dom";
import Button from "~/components/Button";
import ErrorOccured from "~/assets/illustrations/error_occured.png";

const ErrorBoundary = () => {
  const error = useRouteError();

  console.error(error);

  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-2 p-8">
        <h1 className=" text-4xl !font-semibold text-center LargePhones:text-3xl MediumPhones:!text-2xl">
          An Error Occured
        </h1>
        <figure className="w-[35%] LargePhones:w-[55%] MediumPhones:!w-[70%]">
          <img src={ErrorOccured} alt="Error Boundary Illustration" />
        </figure>
        <p className="mt-6 mb-2 text-center MediumPhones:text-sm">
          An error occured. Please reload the page or try again later.
        </p>
        <div className="flex items-center mt-4 justify-center">
          <Button onClick={() => window.location.reload()}>Reload Page</Button>
        </div>
      </div>
    </>
  );
};

export default ErrorBoundary;
