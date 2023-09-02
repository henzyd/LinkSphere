import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Wrapper from "~/layouts/app/wrapper";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="bg-AppBG flex-auto">
        <Wrapper>
          <Outlet />
        </Wrapper>
      </main>
    </div>
  );
};

export default App;
