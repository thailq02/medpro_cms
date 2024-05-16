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
import ContentModalCreateMedicalBookingForms from "@/module/medical-booking-forms-management/modal-create-medical-booking-forms";
import ContentModalEditMedicalBookingForms from "@/module/medical-booking-forms-management/modal-edit-medical-booking-forms";

export default function MedicalBookingFormsComponent() {
  const handleOpenModalMedicalBookingForms = (id?: string) => {
    addModal({
      content: id ? (
        <ContentModalEditMedicalBookingForms />
      ) : (
        <ContentModalCreateMedicalBookingForms />
      ),
      options: {title: (id ? "Sửa" : "Tạo") + " hình thức đặt khám"},
    });
  };

  const dataSource = [
    {
      key: "1",
      id: 1,
      name: "Đặt khám theo chuyên khoa",
      slug: "dat-kham-theo-chuyen-khoa",
      image: "",
    },
    {
      key: "2",
      id: 2,
      name: "Đặt khám theo bác sĩ",
      slug: "dat-kham-theo-bac-si",
      image: "",
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
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      align: "center",
    },
    {
      title: "Tên hình thức đặt khám",
      dataIndex: "name",
      key: "name",
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
                onClick={() => handleOpenModalMedicalBookingForms(record.id)}
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
            title="Tạo danh mục"
            onClick={() => handleOpenModalMedicalBookingForms()}
          />,
        ]}
      />
      <TableGlobal dataSource={dataSource} columns={columns} />
    </>
  );
}
