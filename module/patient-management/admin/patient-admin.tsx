"use client";
import {IAppointmentBody} from "@/apiRequest/ApiAppointment";
import {QUERY_PARAMS} from "@/apiRequest/common";
import {ActionButton, EButtonAction} from "@/components/ButtonGlobal";
import TableGlobal from "@/components/TableGlobal";
import {GenderType} from "@/types";
import {
  useDeleteAppointment,
  useQueryGetListAppointment,
  useUpdateStatusAppointment,
} from "@/utils/hooks/appointment";
import {useQueryGetListHospital} from "@/utils/hooks/hospital";
import useSearchParams, {
  paramsDefaultCommon,
} from "@/utils/hooks/searchParams/useSearchParams";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {Row, Space} from "antd";
import {ColumnsType} from "antd/es/table";
import dayjs from "dayjs";

export default function PatientAdmin() {
  const {params, handleChangePagination} = useSearchParams(paramsDefaultCommon);
  const {data, isFetching, refetch} = useQueryGetListAppointment(params);
  const {data: hospital} = useQueryGetListHospital(QUERY_PARAMS);

  const {mutate: deleteAppointment} = useDeleteAppointment();
  const {mutate: updateStatusAppointment} = useUpdateStatusAppointment();

  const renderNameHospital = (hospital_id: string) => {
    return hospital?.payload?.data.find((item) => item._id === hospital_id)
      ?.name;
  };

  const handleDeleteAppointment = (id: string) => {
    deleteAppointment(id, {
      onSuccess: () => refetch(),
    });
  };

  const handleUpdateStatusAppointment = (id: string) => {
    updateStatusAppointment(id, {
      onSuccess: () => refetch(),
    });
  };

  const columns: ColumnsType<IAppointmentBody> = [
    {
      title: "STT",
      dataIndex: "_id",
      key: "_id",
      width: 70,
      align: "center",
      render: (_: any, record: any, index: any) => (
        <div>{index + (params.page - 1) * params.limit + 1}</div>
      ),
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
            <div>{renderNameHospital(record.service?.hospital_id ?? "")}</div>
            <div>{`${record.doctor?.name ? `Bác sĩ: ${record.doctor?.name}` : "Bác sĩ trực thuộc bệnh viện"}`}</div>
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
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      fixed: "right",
      width: 100,
      render: (_, record) => {
        return (
          <div className="w-full h-full">
            {record.status === false ? (
              <CloseCircleOutlined className="text-3xl text-red-600" />
            ) : (
              <CheckCircleOutlined className="text-3xl text-[#6BC839]" />
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
      render: (_, record) => {
        return (
          <Row justify="center">
            <Space direction="horizontal" size={"middle"}>
              <ActionButton
                type={EButtonAction.CONFIRM}
                onClick={() => handleUpdateStatusAppointment(record._id ?? "")}
              />
              <ActionButton
                type={EButtonAction.DELETE}
                onClick={() => handleDeleteAppointment(record._id ?? "")}
              />
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
        onChange={handleChangePagination}
        pagination={{
          total: data?.payload.meta.total_items,
          current: data?.payload.meta.current_page,
          pageSize: data?.payload.meta.limit,
        }}
        loading={isFetching}
      />
    </>
  );
}
