import { Suspense } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import { Chats, Home, PostDetails, Profile, Requests, Settings } from "./pages";
import NotFound from "./pages/NotFound";
import AppLayout from "./layouts/app";
import ErrorBoundary from "./components/ErrorBoundary";
import Lazy from "./components/loaders/Lazy";
import Auth from "./layouts/Auth";
import HomeLoader from "./components/loaders/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

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
        <Route element={<Auth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token/:userId" element={<ResetPassword />} />
        </Route>
        <Route
          element={
            <Suspense fallback={<HomeLoader />}>
              <AppLayout />
            </Suspense>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/posts/:postId" element={<PostDetails />} />
          <Route path="/:tag" element={<Profile />} />
        </Route>
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
