import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home, Login, Signup } from "./pages";
import { Suspense } from "react";
import LazyLoader from "./components/LazyLoader";
import NotFound from "./pages/NotFound";

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
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<LazyLoader />}>
              <Signup />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
