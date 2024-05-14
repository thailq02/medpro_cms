import React from "react";
import {CommonReactProps} from "@/types";
import classNames from "classnames";
import Config from "@/config";
import "./index.scss";

export default function Main({children}: CommonReactProps) {
  const isOpen = false;

  const {useSidebar, useNavbar} = Config.LAYOUT_CONFIG;
  return (
    <div
      className={classNames(
        "main",
        {"has-navbar": useNavbar},
        {"has-sidebar": useSidebar},
        {"sidebar-open": isOpen},
      )}
    >
      {children}
    </div>
  );
}
