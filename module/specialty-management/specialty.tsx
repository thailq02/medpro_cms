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
import ContentModalCreateSpecialty from "@/module/specialty-management/modal-create-specialty";
import ContentModalEditSpecialty from "@/module/specialty-management/modal-edit-specialty";

export default function SpecialtyComponent() {
  const handleOpenModalSpecialty = (id?: string) => {
    addModal({
      content: id ? (
        <ContentModalEditSpecialty />
      ) : (
        <ContentModalCreateSpecialty />
      ),
      options: {title: id ? "Sửa chuyên khoa" : "Tạo chuyên khoa"},
    });
  };
  const dataSource = [
    {
      key: "1",
      id: 1,
      name: "Khoa ngoại thần kinh",
      hospital: "Bệnh viện đa khoa Singapore",
      description: "Bệnh viện đa khoa Singapore (Singapore General Hospital)",
      slug: "benh-vien-da-khoa-singapore",
    },
    {
      key: "2",
      id: 2,
      name: "Khoa nội thần kinh",
      hospital: "Bệnh viện Đại học Y Dược TP.HCM",
      description: "Bệnh viện Đại học Y Dược TP.HCM",
      slug: "benh-vien-dai-hoc-y-duoc",
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
      title: "Tên chuyên khoa",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Bệnh viện",
      dataIndex: "hospital",
      key: "hospital",
      align: "center",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
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
                onClick={() => handleOpenModalSpecialty(record.id)}
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
            title="Tạo chuyên khoa"
            onClick={() => handleOpenModalSpecialty()}
          />,
        ]}
      />
      <TableGlobal dataSource={dataSource} columns={columns} />
    </>
  );
}
