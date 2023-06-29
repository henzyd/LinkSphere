import Seo from "../utils/Seo";
import Button from "../components/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Seo title="Not Found" description="NotFound page" />
      <main className="w-full min-h-screen flex flex-col items-center justify-center gap-2 p-8">
        <h1 className=" text-4xl !font-semibold text-center LargePhones:text-3xl MediumPhones:!text-2xl">
          Page not found
        </h1>
        <figure className="w-[35%] LargePhones:w-[55%] MediumPhones:!w-[70%]">
          <img
            src={
              "https://res.cloudinary.com/dkok98flj/image/upload/v1687641205/illustrations/404_nyhtpg.png"
            }
            alt="Not found Illustration"
          />
        </figure>
        <p className="mt-6 mb-2 text-center MediumPhones:text-sm">
          We couldn't find what you are looking for. Let's find a better place
          for you to go.
        </p>
        <div className="flex items-center gap-8">
          <Button
            variant="contained"
            color="info"
            onClick={() => {
              navigate("/");
            }}
          >
            Go to Home
          </Button>
          <Button
            onClick={() => {
              navigate(-1);
            }}
            startIcon={
              <KeyboardBackspaceIcon className="!fill-white MediumPhones:!w-4" />
            }
          >
            Go Back
          </Button>
        </div>
      </main>
    </>
  );
};

export default NotFound;
