import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import theme from "./utils/theme.ts";
import store from "./redux/store";
import LazyLoader from "./components/LazyLoader.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Suspense fallback={<LazyLoader />}>
            <App />
          </Suspense>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
