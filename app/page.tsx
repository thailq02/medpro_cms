"use client";

import store from "@/redux/store";
import React from "react";

export default function Home() {
  const {user} = store.getState();
  console.log("Home ~ user", user);
  return <div>Home</div>;
}
