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
import ContentModalCreateDoctor from "@/module/doctor-management/modal-create-doctor";
import ContentModalEditDoctor from "@/module/doctor-management/modal-edit-doctor";

export default function DoctorComponent() {
  const handleOpenModalDoctor = (id?: string) => {
    addModal({
      content: id ? <ContentModalEditDoctor /> : <ContentModalCreateDoctor />,
      options: {
        title: id ? "Sửa thông tin bác sĩ" : "Tạo thông tin bác sĩ",
        widthModal: 700,
      },
    });
  };
  const dataSource = [
    {
      key: "1",
      id: 1,
      image: "",
      name: "Lê Quang Thái",
      specialty: "Khoa ngoại thần kinh",
      hospital: "Bệnh viện đa khoa Singapore",
      therapy: "Chuyên trị các bệnh về ngoại thần kinh",
      price: 10000,
      session: "Thứ 2 - Thứ 6: 8h - 17h",
    },
    {
      key: "2",
      id: 2,
      image: "",
      name: "Quang Thái",
      specialty: "Khoa nội thần kinh",
      hospital: "Bệnh viện Đại học Y Dược TP.HCM",
      therapy: "Chuyên trị các bệnh về ngoại thần kinh",
      price: 10000,
      session: "Thứ 2 - Thứ 6: 8h - 17h",
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
      title: "Image",
      dataIndex: "image",
      key: "image",
      align: "center",
    },
    {
      title: "Tên bác sĩ",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Tên chuyên khoa",
      dataIndex: "specialty",
      key: "specialty",
      align: "center",
    },
    {
      title: "Bệnh viện",
      dataIndex: "hospital",
      key: "hospital",
      align: "center",
    },
    {
      title: "Chuyên trị",
      dataIndex: "therapy",
      key: "therapy",
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
                onClick={() => handleOpenModalDoctor(record.id)}
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
            title="Tạo bác sĩ"
            onClick={() => handleOpenModalDoctor()}
          />,
        ]}
      />
      <TableGlobal dataSource={dataSource} columns={columns} />
    </>
  );
}
