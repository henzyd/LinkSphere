/* eslint-disable react-refresh/only-export-components */
import { toast, Toaster } from "react-hot-toast";

export const notifySuccess = (message: string) =>
  toast.success(message, {
    duration: 3000,
  });

export const notifyError = (message: string) =>
  toast.error(message, {
    duration: 3000,
  });

<Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: "",
    duration: 3000,
    style: {
      background: "#363636",
      color: "#fff",
    },
    loading: {
      duration: 5000,
    },

    // Default options for specific types
    success: {
      duration: 3000,
      // theme: {
      //   primary: "green",
      //   secondary: "black",
      // },
    },
  }}
/>;

export default Toaster;
