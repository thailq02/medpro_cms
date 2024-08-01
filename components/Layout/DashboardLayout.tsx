import Content from "@/components/Layout/Content";
import Main from "@/components/Layout/Main";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
import Config from "@/config";
import {CommonReactProps} from "@/types";
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
        <Content>{children}</Content>
      </Main>
    </div>
  );
}
