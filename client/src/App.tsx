import { Suspense } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import { Home } from "./pages";
import NotFound from "./pages/NotFound";
import AppLayout from "./layouts/app";
import ErrorBoundary from "./components/ErrorBoundary";
import Lazy from "./components/loaders/Lazy";
import Auth from "./layouts/Auth";
import HomeLoader from "./components/loaders/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";

async function loader() {
  try {
    // await fetchUserIfTokenExists();

    return null;
  } catch (error) {
    return new Response("", {
      status: 302,
      headers: {
        Location: "/login",
      },
    });
  }
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />}>
      <Route loader={loader}>
        <Route
          element={
            <Suspense fallback={<HomeLoader />}>
              <AppLayout />
            </Suspense>
          }
        >
          <Route path="/" element={<Home />} />
        </Route>
      </Route>
      <Route element={<Auth />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} fallbackElement={<Lazy />} />
    </div>
  );
}

export default App;
