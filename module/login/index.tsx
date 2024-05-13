"use client";
import "./index.scss";
import SignIn from "@/module/login/SignIn";
import React, {useState} from "react";

export function Login(): JSX.Element {
  const [tab, setTab] = useState("signIn");

  const tabList = {
    signIn: {
      component: SignIn,
    },
  };

  return (
    <div className="container-login">
      <div className="form-container">
        <div className="form">
          {React.createElement(tabList[tab as keyof typeof tabList].component, {
            changeTab: setTab,
          })}
        </div>
      </div>
    </div>
  );
}
