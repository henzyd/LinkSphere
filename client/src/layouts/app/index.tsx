import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Wrapper from "~/layouts/app/wrapper";

const App = () => {
  return (
    <div>
      <NavBar />
      <main className="bg-AppBG ">
        <Wrapper>
          <Outlet />
        </Wrapper>
      </main>
    </div>
  );
};

export default App;
