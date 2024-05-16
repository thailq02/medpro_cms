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
import ContentModalCreateHospital from "@/module/hospital-management/modal-create-hospital";
import ContentModalEditHospital from "@/module/hospital-management/modal-edit-hospital";
import "./index.scss";

export default function HospitalComponent() {
  const handleOpenModalHospital = (id?: string) => {
    addModal({
      content: id ? (
        <ContentModalEditHospital />
      ) : (
        <ContentModalCreateHospital />
      ),
      options: {
        title: (id ? "Sửa" : "Tạo") + " bệnh viện",
        widthModal: 1000,
        classNames: "modal-container-hospital",
      },
    });
  };
  const dataSource = [
    {
      key: "1",
      id: 1,
      image: "",
      name: "Bệnh viện đa khoa Singapore",
      description: "Bệnh viện đa khoa Singapore (Singapore General Hospital)",
      session: "8h - 17h",
      hotline: "1900 1234",
      address: "123 Nguyễn Văn Linh, Quận 7, TP.HCM",
    },
    {
      key: "2",
      id: 2,
      image: "",
      name: "Bệnh viện Đại học Y Dược TP.HCM",
      description: "Bệnh viện Đại học Y Dược TP.HCM",
      session: "8h - 17h",
      hotline: "1900 1234",
      address: "Cơ sở 201 Nguyễn Chí Thanh, Phường 12, Quận 5, TP. Hồ Chí Minh",
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
      title: "Ảnh",
      dataIndex: "avatar",
      key: "avatar",
      align: "center",
    },
    {
      title: "Tên bệnh viện",
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
      title: "Lịch làm việc",
      dataIndex: "session",
      key: "session",
      align: "center",
    },
    {
      title: "Hotline",
      dataIndex: "hotline",
      key: "hotline",
      align: "center",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
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
                onClick={() => handleOpenModalHospital(record.id)}
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
            title="Tạo bệnh viện"
            onClick={() => handleOpenModalHospital()}
          />,
        ]}
      />
      <TableGlobal dataSource={dataSource} columns={columns} />
    </>
  );
}
