/* eslint-disable @typescript-eslint/no-empty-interface */
import React from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import AppContainer from "../components/AppContainer";

interface AppLayoutProps {}

const AppLayout: React.FC<AppLayoutProps> = () => {
  return (
    <div>
      <NavBar />
      <main className="bg-AppBG h-[400vh]">
        <AppContainer>
          <Outlet />
        </AppContainer>
      </main>
    </div>
  );
};

export default AppLayout;
