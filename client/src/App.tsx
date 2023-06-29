import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ForgotPassword, Home, Login, Signup } from "./pages";
import { Suspense } from "react";
import LazyLoader from "./components/LazyLoader";
import NotFound from "./pages/NotFound";
import AuthLayout from "./layouts/AuthLayout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<LazyLoader />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<LazyLoader />}>
              <AuthLayout>
                <Login />
              </AuthLayout>
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<LazyLoader />}>
              <AuthLayout>
                <Signup />
              </AuthLayout>
            </Suspense>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <Suspense fallback={<LazyLoader />}>
              <ForgotPassword />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
