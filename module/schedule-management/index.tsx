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
import ContentModalEditAccount from "@/module/account-manager/modal-edit-account";
import {
  useDeleteSchedule,
  useQueryGetListSchedule,
} from "@/utils/hooks/schedule";
import {useQueryGetListDoctor} from "@/utils/hooks/doctor";
import {IScheduleBody} from "@/apiRequest/ApiSchedule";
import ContentModalCreateSchedule from "@/module/schedule-management/modal-create-schedule";

const QUERY_PARAMS = {
  page: 1,
  limit: 99,
};

function renderTimeType(timeType: string[]): JSX.Element {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {timeType.map((time, index) => {
        return (
          <div
            key={index}
            className="text-center bg-green-400 text-black p-2 font-bold rounded-xl"
          >
            {time}
          </div>
        );
      })}
    </div>
  );
}

export default function ScheduleManagement() {
  const {data: dataSchedule, isFetching, refetch} = useQueryGetListSchedule();
  const {data: dataDoctor} = useQueryGetListDoctor(QUERY_PARAMS);
  const {mutate: DeleteScheduleMutation} = useDeleteSchedule();

  const handleOpenModalAccount = (id?: string) => {
    addModal({
      content: id ? (
        <ContentModalEditAccount />
      ) : (
        <ContentModalCreateSchedule refetch={refetch} />
      ),
      options: {title: (id ? "Sửa" : "Tạo") + " lịch trình", widthModal: 600},
    });
  };

  const handleDeleteSchedule = (id: string) => {
    DeleteScheduleMutation(id, {
      onSuccess: () => {
        refetch();
      },
    });
  };
  const columns: ColumnsType<IScheduleBody> = [
    {
      title: "STT",
      dataIndex: "_id",
      key: "_id",
      width: 80,
      align: "center",
      render: (_: any, record: any, index: any) => <div>{index + 1}</div>,
    },
    {
      title: "Tên bác sĩ",
      dataIndex: "name",
      key: "name",
      align: "center",
      fixed: "left",
      width: 250,
      render: (_, record) => {
        const doctor = dataDoctor?.payload.data.find(
          (doctor) => doctor.doctor_id === record.doctor_id,
        );
        return doctor?.name;
      },
    },
    {
      title: "Bệnh viện làm việc",
      dataIndex: "hospital",
      key: "hospital",
      align: "center",
      render: (_, record) => {
        const doctor = dataDoctor?.payload.data.find(
          (doctor) => doctor.doctor_id === record.doctor_id,
        );
        return doctor?.specialty?.hospital?.name;
      },
    },
    {
      title: "Chuyên khoa làm việc",
      dataIndex: "specialty",
      key: "specialty",
      align: "center",
      render: (_, record) => {
        const doctor = dataDoctor?.payload.data.find(
          (doctor) => doctor._id === record.doctor_id,
        );
        return doctor?.specialty?.name;
      },
    },
    {
      title: "Ngày làm việc",
      dataIndex: "date",
      key: "date",
      align: "center",
      width: 150,
    },
    {
      title: "Ca làm việc",
      dataIndex: "time_type",
      key: "time_type",
      align: "center",
      fixed: "right",
      render: (_, record): JSX.Element =>
        renderTimeType(record.time_type as string[]),
    },
    {
      title: "Số bệnh nhân hiện tại",
      dataIndex: "current_number",
      key: "current_number",
      align: "center",
      width: 100,
    },
    {
      title: "Số bệnh nhân tối đa",
      dataIndex: "max_number",
      key: "max_number",
      align: "center",
      width: 100,
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
                type={EButtonAction.EDIT}
                onClick={() => handleOpenModalAccount(record._id)}
              />
              <ActionButton
                type={EButtonAction.DELETE}
                onClick={() => handleDeleteSchedule(record._id as string)}
              />
            </Space>
          </Row>
        );
      },
    },
  ];

  if (!dataSchedule || !dataDoctor) return;
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
        dataSource={dataSchedule?.payload.data}
        columns={columns}
        loading={isFetching}
      />
    </>
  );
}
