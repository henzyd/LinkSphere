import { Toaster } from "react-hot-toast";

<Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    className: "",
    duration: 3000,
    style: {
      background: "#363636",
      color: "#fff",
    },
    loading: {
      duration: 5000,
    },
  }}
/>;

export default Toaster;
