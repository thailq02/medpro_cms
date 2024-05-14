import React from "react";
import {CommonReactProps} from "@/types";
import Config from "@/config";
import Sidebar from "@/components/Layout/Sidebar";
import Main from "@/components/Layout/Main";
import Navbar from "@/components/Layout/Navbar";
import "./index.scss";

export default function DashboardLayout({
  children,
}: CommonReactProps): JSX.Element {
  const {useSidebar, useNavbar, useFooter, useBottomNavigator} =
    Config.LAYOUT_CONFIG;
  return (
    <div className="wrapper">
      {useSidebar && <Sidebar />}
      <Main>
        {useNavbar && <Navbar />}
        {children}
      </Main>
    </div>
  );
}
