import {CommonReactProps} from "@/types";
import React from "react";
import "./index.scss";

export default function Content({children}: CommonReactProps) {
  return <div className="content">{children}</div>;
}
