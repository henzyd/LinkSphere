import { lazy, LazyExoticComponent } from "react";

export const Home: LazyExoticComponent<React.FC> = lazy(() => import("./Home"));
export const Login: LazyExoticComponent<React.FC> = lazy(
  () => import("./Login")
);
export const Signup: LazyExoticComponent<React.FC> = lazy(
  () => import("./Signup")
);
export const ForgotPassword: LazyExoticComponent<React.FC> = lazy(
  () => import("./ForgotPassword")
);
