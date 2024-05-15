"use client";
import React from "react";
import Config from "config";
import {useRouter} from "next/navigation";
import {Result, Button} from "antd";

export default function Custom404(): JSX.Element {
  const router = useRouter();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang này không tồn tại"
      extra={
        <Button
          type="primary"
          onClick={(): void => {
            router.push(Config.PATHNAME.HOME);
          }}
        >
          Quay về trang chủ
        </Button>
      }
    />
  );
}
