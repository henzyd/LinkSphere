import { useState, useRef } from "react";
import { IconButton } from "@mui/material";
import { Formik } from "formik";
import { IoArrowBackOutline } from "react-icons/io5";
import { AiFillCamera } from "react-icons/ai";
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

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState<{
    file: File | null;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
  }>({
    file: null,
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  });
  const [profileImgHovering, setProfileImgHovering] = useState(false);

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
          <div
            className="mx-auto border border-gray-400 w-[200px] h-[200px] rounded-full relative overflow-hidden"
            onMouseEnter={() => setProfileImgHovering(true)}
            onMouseLeave={() => setProfileImgHovering(false)}
          >
            <figure
              className={`w-full h-full overflow-hidden flex justify-center items-center ${
                profileImgHovering ? "blur-sm" : "blur-none"
              }`}
            >
              {formData.file ? (
                <img
                  src={URL.createObjectURL(formData.file)}
                  alt="default-profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={Profile}
                  alt="default-profile"
                  className="w-[70%] aspect-square object-contain"
                />
              )}
            </figure>
            <button
              className={`w-full rounded-full absolute top-0 left-0 flex justify-center items-center aspect-square bg-zinc-300 transition-all border-0 ${
                profileImgHovering ? "opacity-60" : "opacity-0"
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files) {
                    setFormData((prev) => ({ ...prev, file: e.target.files?.[0] || null }));
                  }
                }}
                ref={fileInputRef}
                accept="image/png, image/jpg, image/jpeg"
                className="hidden"
              />
              <AiFillCamera className="text-[4rem] text-zinc-800" />
            </button>
          </div>
          <Formik
            initialValues={{
              username: "",
              email: "",
              firstName: "",
              lastName: "",
            }}
            onSubmit={(values) => {
              setFormData((prev) => ({
                ...prev,
                ...values,
              }));
            }}
            validationSchema={validationSchema}
            validateOnBlur={false}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit} className="gird grid-cols-2 gap-6">
                <div className="grid grid-cols-2 gap-5">
                  <FormField label="Username" name="username" data-testid="username" />
                  <FormField label="Email Address" name="email" type="email" data-testid="email" />
                  <FormField label="First Name" name="firstName" data-testid="firstName" />
                  <FormField label="Last Name" name="lastName" data-testid="lastName" />
                  <FormField
                    label="Address"
                    containerClassName="col-span-2"
                    name="address"
                    data-testid="address"
                  />
                  <FormField
                    containerClassName="col-span-2"
                    label="Description"
                    name="description"
                    multiline
                    rows={6}
                    data-testid="description"
                  />
                </div>
                <div className="flex items-center justify-end mt-6">
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
