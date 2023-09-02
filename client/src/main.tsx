import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import theme from "./utils/theme";
import store from "./redux/store";
import Lazy from "./components/loaders/Lazy";
import Toaster from "./components/Toast";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Suspense fallback={<Lazy />}>
          <App />
        </Suspense>
        <Toaster />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
