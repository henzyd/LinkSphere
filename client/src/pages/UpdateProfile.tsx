import { useState } from "react";
import { IconButton } from "@mui/material";
import { Formik } from "formik";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Button from "~/components/Button";
import FormField from "~/components/FormField";
import PageWrapper from "~/components/PageWrapper";
import Seo from "~/components/Seo";
import Profile from "~/assets/images/profile.png";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email address").required("Email address is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
});

const UpdateProfile = () => {
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setData] = useState({
    file: null,
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  });

  return (
    <>
      <Seo title="Update Profile" description="Update your profile" />
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
          <h1 className="text-base font-medium">Update Profile</h1>
        </header>
        <main className="flex flex-col gap-8 p-8">
          <div className="mx-auto border border-gray-400 rounded-md w-[200px] p-4">
            <figure className="w-full">
              <img src={Profile} alt="default-profile" className="w-full h-full object-cover" />
            </figure>
          </div>
          <Formik
            initialValues={{
              username: "",
              email: "",
              firstName: "",
              lastName: "",
            }}
            onSubmit={(values) => {
              setData((prev) => ({
                ...prev,
                ...values,
              }));
            }}
            validationSchema={validationSchema}
            validateOnBlur={false}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-5 gap-y-8">
                  <FormField label="Username" name="username" data-testid="username" />
                  <FormField label="Email Address" name="email" type="email" data-testid="email" />
                  <FormField label="First Name" name="firstName" data-testid="firstName" />
                  <FormField label="Last Name" name="lastName" data-testid="lastName" />
                </div>
                <div className="flex items-center justify-end">
                  <Button type="submit" className="w-fit" loading={isSubmitting}>
                    Save
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </main>
      </PageWrapper>
    </>
  );
};

export default UpdateProfile;
