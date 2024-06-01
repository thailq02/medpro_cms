"use client";
import React from "react";
import TableGlobal from "@/components/TableGlobal";
import {ColumnsType} from "antd/es/table";
import {
  ActionButton,
  ButtonAdd,
  EButtonAction,
} from "@/components/ButtonGlobal";
import {Image, Row, Space} from "antd";
import {InputSearchGlobal} from "@/components/InputSearchGlobal";
import {InputFilterGlobal} from "@/components/InputFilterGlobal";
import HeaderToolTable from "@/components/HeaderToolTable";
import {addModal} from "@/components/ModalGlobal";
import ContentModalCreateAccount from "@/module/account-manager/modal-create-account";
import ContentModalEditAccount from "@/module/account-manager/modal-edit-account";
import {IAccountRole, VerifyStatus} from "@/types";
import {IUserLogin} from "@/apiRequest/ApiUser";
import {useDeleteAccount, useQueryGetFullUser} from "@/utils/hooks/auth";
import useSearchParams, {
  paramsDefaultCommon,
} from "@/utils/hooks/searchParams/useSearchParams";
import {OPTIONS} from "@/utils/constants/selectList";

export default function AccountManager() {
  const searchPlaceholder = "Tìm kiếm theo name, email, username";
  const {params, handleChangePagination, setSearchValue, setParams} =
    useSearchParams(paramsDefaultCommon);
  const {mutate: DeleteAccountMutation} = useDeleteAccount();
  const {data, isFetching, refetch} = useQueryGetFullUser(params);
  const handleOpenModalAccount = (username?: string) => {
    addModal({
      content: username ? (
        <ContentModalEditAccount idSelect={username} refetch={refetch} />
      ) : (
        <ContentModalCreateAccount />
      ),
      options: username
        ? {title: "Sửa tài khoản", widthModal: 1000}
        : {title: "Tạo tài khoản"},
    });
  };
  const handleDeleteAccount = (username: string) => {
    DeleteAccountMutation(username, {onSuccess: () => refetch()});
  };

  const columns: ColumnsType<IUserLogin> = [
    {
      title: "STT",
      dataIndex: "_id",
      key: "_id",
      width: 80,
      align: "center",
      fixed: "left",
      render: (_: any, record: any, index: any) => (
        <div>{index + (params.page - 1) * params.limit + 1}</div>
      ),
    },
    {
      title: "Ảnh",
      key: "avatar",
      align: "center",
      width: 80,
      fixed: "left",
      render: (_, record): JSX.Element => {
        return (
          <div>
            <Image
              style={{objectFit: "cover"}}
              src={record.avatar || "img/avatar/avatar.jpg"}
              fallback="img/avatar/avatar.jpg"
            />
          </div>
        );
      },
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
        }
        if (record.role === IAccountRole.DOCTOR) {
          return "Bác sĩ";
        }
        if (record.role === IAccountRole.USER) {
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
      title: "Trạng thái",
      dataIndex: "verify",
      key: "verify",
      align: "center",
      fixed: "right",
      width: 100,
      render: (_, record) => {
        return (
          <div className="flex items-center justify-center">
            {record.verify === VerifyStatus.VERIFIED ? (
              <div className=" w-4 h-4 rounded-full bg-green-500"></div>
            ) : record.verify === VerifyStatus.UNVERIFIED ? (
              <div className=" w-4 h-4 rounded-full bg-yellow-500"></div>
            ) : (
              <div className=" w-4 h-4 rounded-full bg-red-500"></div>
            )}
          </div>
        );
      },
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
                onClick={() => handleDeleteAccount(record.username as string)}
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
          <InputSearchGlobal
            key="search"
            placeholder={searchPlaceholder}
            onSearch={(value) => setSearchValue(value)}
          />,
          <InputFilterGlobal
            key="filter"
            params={params}
            options={OPTIONS.LIST_ROLE}
            placeholder="Quyền"
            filterField="role"
            handleChange={setParams}
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
        scrollX={1500}
        dataSource={data?.payload.data}
        columns={columns}
        onChange={handleChangePagination}
        pagination={{
          total: data?.payload.meta.total_items,
          current: data?.payload.meta.current_page,
          pageSize: data?.payload.meta.limit,
        }}
        loading={isFetching}
        onRow={(record): {onDoubleClick: () => void} => {
          return {
            onDoubleClick: () => handleOpenModalAccount(record.username),
          };
        }}
      />
    </>
  );
}
