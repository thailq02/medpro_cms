"use client";

import {MenuOutlined, UserOutlined} from "@ant-design/icons";
import {Avatar} from "antd";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import "./index.scss";
import {usePathname} from "next/navigation";
import routes from "@/routes/RouteList";
import {useQueryGetMe} from "@/utils/hooks/auth";
import {toggleMenu} from "@/redux/slices/MenuSlice";
import {useAppSelector} from "@/redux/store";
import {loginUser} from "@/redux/slices/UserSlice";

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
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const dataUser = useQueryGetMe();
  const fullName = dataUser?.data?.payload?.data?.name;

  useEffect(() => {
    dataUser.refetch().then((data) => {
      dispatch(loginUser({...user, user: data?.data?.payload?.data}));
    });
  }, [user.access_token, user.refresh_token]);

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
          <span className="text-[14px] ml-2 hidden md:flex">{fullName}</span>
        </div>
      </div>
    </div>
  );
}
