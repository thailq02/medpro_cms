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
import {addModal} from "@/components/ModalGlobal";
import ContentModalCreateAccount from "@/module/account-manager/modal-create-account";
import ContentModalEditAccount from "@/module/account-manager/modal-edit-account";
import {IAccountRole} from "@/types";
import {IGetFullUserResBody, IUserLogin} from "@/apiRequest/ApiUser";

type AccountList = IGetFullUserResBody["data"];

export default function AccountManager({
  accountList,
}: {
  accountList: AccountList;
}) {
  const handleOpenModalAccount = (username?: string) => {
    addModal({
      content: username ? (
        <ContentModalEditAccount idSelect={username} />
      ) : (
        <ContentModalCreateAccount />
      ),
      options: username
        ? {title: "Sửa tài khoản", widthModal: 800}
        : {title: "Tạo tài khoản"},
    });
  };

  const columns: ColumnsType<IUserLogin> = [
    {
      title: "STT",
      dataIndex: "_id",
      key: "_id",
      width: 80,
      align: "center",
      fixed: "left",
      render: (_: any, record: any, index: any) => <div>{index + 1}</div>,
    },
    {
      title: "Tên người dùng",
      dataIndex: "name",
      key: "name",
      align: "center",
      fixed: "left",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
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
      width: 160,
      render: (_, record) => {
        if (record.role === IAccountRole.ADMIN) {
          return "Admin";
        } else if (record.role === IAccountRole.DOCTOR) {
          return "Bác sĩ";
        } else if (record.role === IAccountRole.USER) {
          return "Người dùng";
        }
      },
    },
    {
      title: "SĐT",
      dataIndex: "phone_number",
      key: "phone_number",
      align: "center",
      width: 200,
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      width: 150,
      align: "center",
      fixed: "right",
      render: (_, record) => {
        return (
          <Row justify="center">
            <Space direction="horizontal" size={"middle"}>
              <ActionButton
                type={EButtonAction.EDIT}
                onClick={() => handleOpenModalAccount(record.username)}
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
          <ButtonAdd
            title="Tạo tài khoản"
            onClick={() => handleOpenModalAccount()}
          />,
        ]}
      />
      <TableGlobal
        scrollX={2000}
        dataSource={accountList}
        columns={columns}
        // loading={isFetching}
      />
    </>
  );
}
