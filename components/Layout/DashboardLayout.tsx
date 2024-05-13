import React from "react";
import {CommonReactProps} from "@/types";
import Config from "@/config";
import Sidebar from "@/components/Layout/Sidebar";

export default function DashboardLayout({
  children,
}: CommonReactProps): JSX.Element {
  const {useSidebar, useNavbar, useFooter, useBottomNavigator} =
    Config.LAYOUT_CONFIG;
  return (
    <div className="wrapper">
      {useSidebar && <Sidebar />}
      <div className="content">
        {useNavbar && <div className="navbar">Navbar</div>}
        {children}
        {useFooter && <div className="footer">Footer</div>}
      </div>
      {useBottomNavigator && (
        <div className="bottom-navigator">Bottom Navigator</div>
      )}
    </div>
  );
}
