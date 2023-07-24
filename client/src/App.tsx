import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages";
import LazyLoader from "./components/LazyLoader";
import NotFound from "./pages/NotFound";
import Toaster from "./utils/Toast";
import AppLayout from "./layouts/AppLayout";
import AuthRoute from "./routes/AuthRoute";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<LazyLoader />}>
                <Home />
              </Suspense>
            }
          />
        </Route>
        <AuthRoute />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
