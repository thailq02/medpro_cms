import React from "react";
import TableGlobal from "@/components/TableGlobal";
import HeaderToolTable from "@/components/HeaderToolTable";
import {InputSearchGlobal} from "@/components/InputSearchGlobal";
import {InputFilterGlobal} from "@/components/InputFilterGlobal";
import {
  ActionButton,
  ButtonAdd,
  EButtonAction,
} from "@/components/ButtonGlobal";
import {Row, Space} from "antd";
import {ColumnsType} from "antd/es/table";
import {addModal} from "@/components/ModalGlobal";
import ContentModalCreateService from "@/module/service-management/modal-create-service";
import ContentModalEditService from "@/module/service-management/mocal-edit-service";

export default function ServiceComponent() {
  const handleOpenModalSerive = (id?: string) => {
    addModal({
      content: id ? <ContentModalEditService /> : <ContentModalCreateService />,
      options: {title: id ? "Sửa dịch vụ" : "Tạo dịch vụ", widthModal: 800},
    });
  };
  const dataSource = [
    {
      key: "1",
      id: 1,
      name: "Bệnh viện đa khoa Singapore",
      description: "Bệnh viện đa khoa Singapore (Singapore General Hospital)",
      session: "8h - 17h",
      price: 200000,
    },
    {
      key: "2",
      id: 2,
      name: "Bệnh viện Đại học Y Dược TP.HCM",
      description: "Bệnh viện Đại học Y Dược TP.HCM",
      session: "8h - 17h",
      price: 100000,
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
      title: "Tên dịch vụ",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: "Lịch làm việc",
      dataIndex: "session",
      key: "session",
      align: "center",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      width: 150,
      align: "center",
      render: (_, record) => {
        return (
          <Row justify="center">
            <Space direction="horizontal" size={"middle"}>
              <ActionButton
                type={EButtonAction.EDIT}
                onClick={() => handleOpenModalSerive(record.id)}
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
            title="Tạo dịch vụ"
            onClick={() => handleOpenModalSerive()}
          />,
        ]}
      />
      <TableGlobal dataSource={dataSource} columns={columns} />
    </>
  );
}
