import { IconButton, Switch } from "@mui/material";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import PageWrapper from "~/components/PageWrapper";
import Seo from "~/components/Seo";

const Notification = () => {
  const navigate = useNavigate();

  return (
    <>
      <Seo title="Notification" description="Edit your notification settings" />
      <PageWrapper className="py-0">
        <header className="p-2 z-10 flex items-center border-b sticky flex-shrink-0 gap-4">
          <IconButton
            onClick={() => {
              navigate(-1);
            }}
            className="w-fit"
          >
            <IoArrowBackOutline size={20} />
          </IconButton>
          <h1 className="text-base font-medium">Notification</h1>
        </header>
        <main className="flex flex-col gap-8 p-8 pt-3 pb-12">
          <div className="w-[400px] mediumPhones:w-full flex flex-col gap-6">
            <div className="w-full flex justify-between items-center">
              <p>Email Notifications</p>
              <Switch checked={false} />
            </div>
            <div className="w-full flex justify-between items-center">
              <p>Push Notifications</p>
              <Switch checked={true} />
            </div>
          </div>
        </main>
      </PageWrapper>
    </>
  );
};

export default Notification;
