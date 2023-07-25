import React, { Suspense } from "react";
import { ForgotPassword, Login, Signup } from "../pages";
import LazyLoader from "../components/LazyLoader";
import AuthLayout from "../layouts/AuthLayout";

class AuthRoute {
  static Login: React.FC = () => (
    <Suspense fallback={<LazyLoader />}>
      <AuthLayout>
        <Login />
      </AuthLayout>
    </Suspense>
  );

  static Signup: React.FC = () => (
    <Suspense fallback={<LazyLoader />}>
      <AuthLayout>
        <Signup />
      </AuthLayout>
    </Suspense>
  );

  static ForgotPassword: React.FC = () => (
    <Suspense fallback={<LazyLoader />}>
      <ForgotPassword />
    </Suspense>
  );
}

export default AuthRoute;
