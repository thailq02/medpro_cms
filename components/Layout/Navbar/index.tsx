"use client";

import {MenuOutlined, UserOutlined} from "@ant-design/icons";
import {Avatar} from "antd";
import React from "react";
import {useDispatch} from "react-redux";
import "./index.scss";
import {usePathname} from "next/navigation";
import routes from "@/routes/RouteList";
import {useQueryGetMe} from "@/utils/hooks/auth";

function RenderNamePage() {
  const dataRoutes = routes;
  const pathname = usePathname();
  const dataRoutesConvert: {path: string; name: string}[] = [];
  dataRoutes.forEach((val) => {
    if (val.children) {
      val.children.forEach((val2) => {
        dataRoutesConvert.push({path: val.path + val2.path, name: val2.name});
      });
    } else {
      dataRoutesConvert.push({path: val.path, name: val.name});
    }
  });
  return dataRoutesConvert?.find((val) => val.path === pathname)?.name;
}

export default function Navbar(): JSX.Element {
  const dispatch = useDispatch();
  const {data} = useQueryGetMe();
  const toggleMenu: any = () => {
    console.log("123");
  };

  return (
    <div className="navbar flex items-center justify-between">
      <div className="flex items-center">
        <MenuOutlined
          onClick={(): void => {
            dispatch(toggleMenu());
          }}
        />
        <div className="ml-5">
          <RenderNamePage />
        </div>
      </div>
      <div className="group-user-info">
        <div className="cursor-pointer flex items-center">
          <Avatar size="default" icon={<UserOutlined />} />
          <span className="text-[14px] ml-2 hidden md:flex">
            {data?.payload?.data?.username}
          </span>
        </div>
      </div>
    </div>
  );
}
