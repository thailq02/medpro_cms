"use client";
import {IAppointmentBody} from "@/apiRequest/ApiAppointment";
import {QUERY_PARAMS} from "@/apiRequest/common";
import {ActionButton, EButtonAction} from "@/components/ButtonGlobal";
import TableGlobal from "@/components/TableGlobal";
import {GenderType} from "@/types";
import {useQueryGetListAppointment} from "@/utils/hooks/appointment";
import {useQueryGetListHospital} from "@/utils/hooks/hospital";
import {Row, Space} from "antd";
import {ColumnsType} from "antd/es/table";
import dayjs from "dayjs";

export default function PatientManagement() {
  const {data, isFetching} = useQueryGetListAppointment();
  const {data: hospital} = useQueryGetListHospital(QUERY_PARAMS);
  console.log(data);

  const renderNameHospital = (hospital_id: string) => {
    return hospital?.payload?.data.find((item) => item._id === hospital_id)
      ?.name;
  };

  const columns: ColumnsType<IAppointmentBody> = [
    {
      title: "STT",
      dataIndex: "_id",
      key: "_id",
      width: 70,
      align: "center",
      render: (_: any, record: any, index: any) => <div>{index + 1}</div>,
    },
    {
      title: "Thông tin bệnh nhân",
      dataIndex: "fullname",
      key: "fullname",
      align: "center",
      fixed: "left",
      render: (_, record) => {
        return (
          <>
            <div>Họ tên: {record?.fullname}</div>
            <div>
              Ngày sinh: {dayjs(record.date_of_birth).format("DD/MM/YYYY")}
            </div>
            <div>
              Giới tính: {record?.gender === GenderType.MALE ? "Nam" : "Nữ"}
            </div>
          </>
        );
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      align: "center",
    },
    {
      title: "Lý do khám bệnh",
      dataIndex: "reason",
      key: "reason",
      align: "center",
    },
    {
      title: "Thời gian thăm khám",
      dataIndex: "schedule",
      key: "schedule",
      align: "center",
      render: (_, record) => {
        return (
          <>
            <div>Thời gian: {record.time}</div>
            <div>Ngày: {record.date}</div>
          </>
        );
      },
    },
    {
      title: "Bác sĩ khám bệnh",
      dataIndex: ["doctor", "name"],
      key: "doctor",
      align: "center",
      render: (_, record) => {
        return (
          <>
            <div>{renderNameHospital(record.doctor?.hospital_id ?? "")}</div>
            <div>Bác sĩ: {record.doctor?.name}</div>
          </>
        );
      },
    },
    {
      title: "Dịch vụ",
      dataIndex: ["service", "name"],
      key: "service",
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
              <ActionButton type={EButtonAction.DELETE} onClick={() => null} />
            </Space>
          </Row>
        );
      },
    },
  ];
  return (
    <>
      <TableGlobal
        scrollX={2000}
        dataSource={data?.payload?.data}
        columns={columns}
        loading={isFetching}
      />
    </>
  );
}
