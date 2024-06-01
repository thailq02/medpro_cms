"use client";
import React from "react";
import TableGlobal from "@/components/TableGlobal";
import {ColumnsType} from "antd/es/table";
import {
  ActionButton,
  ButtonAdd,
  EButtonAction,
} from "@/components/ButtonGlobal";
import {Row, Space, DatePicker} from "antd";
import HeaderToolTable from "@/components/HeaderToolTable";
import {addModal} from "@/components/ModalGlobal";
import {
  useDeleteSchedule,
  useQueryGetListScheduleByDoctorId,
} from "@/utils/hooks/schedule";
import {useQueryGetListDoctor} from "@/utils/hooks/doctor";
import {IScheduleBody} from "@/apiRequest/ApiSchedule";
import useSearchParams, {
  paramsDefaultCommon,
} from "@/utils/hooks/searchParams/useSearchParams";
import sortTimes from "@/utils/helper/SortTimesHelper";
import store from "@/redux/store";
import ContentModalCreateIndividualSchedule from "@/module/individual-schedule-management/modal-create-individual-schedule";
import ContentModalEditIndividualSchedule from "@/module/individual-schedule-management/modal-edit-individual-schedule";
import dayjs from "dayjs";

const QUERY_PARAMS = {page: 1, limit: 99};

function renderTimeType(timeType: string[]): JSX.Element {
  const timeAfterSort = sortTimes(timeType);
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {timeAfterSort.map((time, index) => {
        return (
          <div
            key={index}
            className="text-center bg-slate-400 text-black p-2 font-semibold rounded-xl"
          >
            {time}
          </div>
        );
      })}
    </div>
  );
}

export default function IndividualScheduleManagement() {
  const {user} = store.getState().user;
  const {params, handleChangePagination, setParams} =
    useSearchParams(paramsDefaultCommon);
  const {
    data: dataSchedule,
    isFetching,
    refetch,
  } = useQueryGetListScheduleByDoctorId({
    doctor_id: user?._id as string,
    params,
  });

  const {data: dataDoctor} = useQueryGetListDoctor(QUERY_PARAMS);
  const {mutate: DeleteScheduleMutation} = useDeleteSchedule();

  const handleOpenModalSchedule = (id?: string) => {
    addModal({
      content: id ? (
        <ContentModalEditIndividualSchedule
          idSelect={id}
          refetch={refetch}
          doctorId={user?._id ?? ""}
        />
      ) : (
        <ContentModalCreateIndividualSchedule
          refetch={refetch}
          doctorId={user?._id ?? ""}
        />
      ),
      options: {
        title: (id ? "Sửa" : "Tạo") + " lịch trình",
      },
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
      render: (_: any, record: any, index: any) => (
        <div>{index + (params.page - 1) * params.limit + 1}</div>
      ),
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
      title: "Ngày làm việc",
      dataIndex: "date",
      key: "date",
      align: "center",
      width: 150,
      fixed: "right",
      render: (_, record) => {
        return <span className="text-lg font-medium">{record.date}</span>;
      },
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
                onClick={() => handleOpenModalSchedule(record._id)}
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
  return (
    <>
      <HeaderToolTable
        buttonBox={[
          <ButtonAdd
            title="Tạo lịch trình"
            key="button-add"
            onClick={() => handleOpenModalSchedule()}
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
        scrollX={1500}
        dataSource={dataSchedule?.payload.data}
        columns={columns}
        onChange={handleChangePagination}
        pagination={{
          total: dataSchedule?.payload.meta.total_items,
          current: dataSchedule?.payload.meta.current_page,
          pageSize: dataSchedule?.payload.meta.limit,
        }}
        loading={isFetching}
      />
    </>
  );
}
