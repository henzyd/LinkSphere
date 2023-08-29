import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages";
import NotFound from "./pages/NotFound";
import Toaster from "./components/Toast";
import AppLayout from "./layouts/app";
import AuthRoute from "./routes/AuthRoute";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<AuthRoute.Login />} />
        <Route path="/signup" element={<AuthRoute.Signup />} />
        <Route path="/forgot-password" element={<AuthRoute.ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
