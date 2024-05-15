"use client";

import React from "react";
import TableGlobal from "@/components/TableGlobal";
import {ColumnsType} from "antd/es/table";
import {
  ActionButton,
  ButtonAdd,
  EButtonAction,
} from "@/components/ButtonGlobal";
import {Row, Space} from "antd";
import {InputSearchGlobal} from "@/components/InputSearchGlobal";
import {InputFilterGlobal} from "@/components/InputFilterGlobal";
import HeaderToolTable from "@/components/HeaderToolTable";

export default function AccountManagerComponent() {
  const dataSource = [
    {
      key: "1",
      name: "Lê Quang Thái",
      age: 21,
      email: "thai@gmail.com",
      phone_number: "0123456789",
      role: "Doctor",
    },
    {
      key: "2",
      name: "Admin",
      age: 22,
      email: "admin@gmail.com",
      phone_number: "0123456789",
      role: "Admin",
    },
  ];

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      width: 80,
      align: "center",
      render: (_: any, record: any, index: any) => <div>{index + 1}</div>,
    },
    {
      title: "Tên người dùng",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Quyền",
      dataIndex: "role",
      key: "role",
      align: "center",
    },
    {
      title: "SĐT",
      dataIndex: "phone_number",
      key: "phone_number",
      align: "center",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      width: 150,
      align: "center",
      render: () => {
        return (
          <Row justify="center">
            <Space direction="horizontal" size={"middle"}>
              <ActionButton
                type={EButtonAction.EDIT}
                onClick={() => undefined}
              />
              <ActionButton
                type={EButtonAction.DELETE}
                onClick={() => undefined}
              />
            </Space>
          </Row>
        );
      },
    },
  ];

  return (
    <>
      <HeaderToolTable
        searchFilterBox={[
          <InputSearchGlobal key="search" />,
          <InputFilterGlobal
            key="filter"
            params={undefined}
            filterField={""}
            handleChange={function (value: any): void {
              throw new Error("Function not implemented.");
            }}
          />,
        ]}
        buttonBox={[
          <ButtonAdd title="Thêm người dùng" onClick={() => undefined} />,
        ]}
      />
      <TableGlobal dataSource={dataSource} columns={columns} />
    </>
  );
}
