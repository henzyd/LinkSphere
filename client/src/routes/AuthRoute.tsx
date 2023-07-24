import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import { ForgotPassword, Login, Signup } from "../pages";
import LazyLoader from "../components/LazyLoader";
import AuthLayout from "../layouts/AuthLayout";

const AuthRoute: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default AuthRoute;
