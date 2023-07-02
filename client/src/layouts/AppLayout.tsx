/* eslint-disable @typescript-eslint/no-empty-interface */
import React from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

interface AppLayoutProps {}

const AppLayout: React.FC<AppLayoutProps> = () => {
  return (
    <div>
      <NavBar />
      <main className="bg-AppBG min-h-[87vh]">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
