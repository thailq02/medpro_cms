import React from "react";
import "./index.scss";
import Image from "next/image";
import type {MenuProps} from "antd";
import {Menu} from "antd";
import RouterList from "@/routes/RouteList";

type MenuItem = Required<MenuProps>["items"][number];

const RenderMenu = () => {
  const onClick: any = () => {
    console.log(123);
  };
  return (
    <Menu
      onClick={onClick}
      style={{width: 256}}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={undefined}
    />
  );
};

export default function Sidebar() {
  return (
    <div className={`sidebar absolute md:static`}>
      <div className="logo-container">
        <Image src="/img/logo.png" alt="logo" width={50} height={50} />
      </div>
    </div>
  );
}
