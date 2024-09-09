import React from "react";
import Navbar from "./components-org/DefaultBars/Navbar";
import Footer from "./components-org/DefaultBars/Footer";
import { Outlet } from "react-router-dom";
import "./navlink-active.css";
const RootLayout = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col overflow-hidden">
      <Navbar />
      <div className=" h-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
