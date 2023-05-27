import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages";
import { Suspense } from "react";
import LazyLoader from "./components/LazyLoader";

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
      </Routes>
    </div>
  );
}

export default App;
