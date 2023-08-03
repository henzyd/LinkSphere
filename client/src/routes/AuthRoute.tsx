import React from "react";
import { ForgotPassword, Login, Signup } from "../pages";
import AuthLayout from "../layouts/AuthLayout";

class AuthRoute {
  static Login: React.FC = () => (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );

  static Signup: React.FC = () => (
    <AuthLayout>
      <Signup />
    </AuthLayout>
  );

  static ForgotPassword: React.FC = () => <ForgotPassword />;
}

export default AuthRoute;
