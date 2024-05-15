import React from "react";
import {Spin} from "antd";

const Loading: React.FC = () => (
  <div>
    <Spin fullscreen size="large" />
  </div>
);

export default Loading;
