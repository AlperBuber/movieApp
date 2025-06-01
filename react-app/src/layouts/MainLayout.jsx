import React from "react";
import { NavLink, Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="m-0  ">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
