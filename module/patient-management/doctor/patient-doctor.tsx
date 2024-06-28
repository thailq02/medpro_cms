"use client";
import {IAppointmentBody} from "@/apiRequest/ApiAppointment";
import {ActionButton, EButtonAction} from "@/components/ButtonGlobal";
import HeaderToolTable from "@/components/HeaderToolTable";
import {InputSearchGlobal} from "@/components/InputSearchGlobal";
import TableGlobal from "@/components/TableGlobal";
import store from "@/redux/store";
import {GenderType} from "@/types";
import {
  useDeleteAppointment,
  useQueryGetAppointmentByDoctorId,
  useUpdateStatusAppointment,
} from "@/utils/hooks/appointment";
import useSearchParams, {
  paramsDefaultCommon,
} from "@/utils/hooks/searchParams/useSearchParams";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {DatePicker, Row, Space} from "antd";
import {ColumnsType} from "antd/es/table";
import dayjs from "dayjs";

export default function PatientDoctor() {
  const {user} = store.getState().user;
  const {params, handleChangePagination, setParams, setSearchValue} =
    useSearchParams(paramsDefaultCommon);

  const {data, isFetching, refetch} = useQueryGetAppointmentByDoctorId(
    user?._id ?? "",
    params,
  );
  const {mutate: deleteAppointment} = useDeleteAppointment();
  const {mutate: updateStatusAppointment} = useUpdateStatusAppointment();

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
      fixed: "right",
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
      width: 100,
      align: "center",
      fixed: "right",
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
      <HeaderToolTable
        searchFilterBox={[
          <InputSearchGlobal
            key="search"
            placeholder="Tìm kiếm bệnh nhân"
            onSearch={(value) => setSearchValue(value)}
          />,
        ]}
        dateFilterBox={[
          <DatePicker
            format={"DD/MM/YYYY"}
            placeholder="Tìm kiếm ngày làm việc"
            className="cursor-pointer w-[200px]"
            inputReadOnly={true}
            onChange={(e) => {
              if (e) {
                const date = dayjs(e.toString()).format("DD/MM/YYYY");
                setParams((prevParams) => ({
                  ...prevParams,
                  date,
                }));
              } else {
                setParams((prevParams) => ({
                  ...prevParams,
                  date: "",
                }));
              }
            }}
          />,
        ]}
      />
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
