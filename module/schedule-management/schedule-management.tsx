"use client";
import {IScheduleBody} from "@/apiRequest/ApiSchedule";
import {QUERY_PARAMS} from "@/apiRequest/common";
import {
  ActionButton,
  ButtonAdd,
  EButtonAction,
} from "@/components/ButtonGlobal";
import HeaderToolTable from "@/components/HeaderToolTable";
import {InputFilterGlobal} from "@/components/InputFilterGlobal";
import {addModal} from "@/components/ModalGlobal";
import TableGlobal from "@/components/TableGlobal";
import ContentModalCreateSchedule from "@/module/schedule-management/modal-create-schedule";
import ContentModalEditSchedule from "@/module/schedule-management/modal-edit-schedule";
import store from "@/redux/store";
import {IAccountRole} from "@/types";
import sortTimes from "@/utils/helper/SortTimesHelper";
import {useQueryGetListDoctor} from "@/utils/hooks/doctor";
import {
  useDeleteSchedule,
  useQueryGetListSchedule,
} from "@/utils/hooks/schedule";
import useSearchParams, {
  paramsDefaultCommon,
} from "@/utils/hooks/searchParams/useSearchParams";
import {DatePicker, Row, Space} from "antd";
import {ColumnsType} from "antd/es/table";
import dayjs from "dayjs";
import {useMemo} from "react";

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

export default function ScheduleManagement() {
  const {user} = store.getState().user;

  const {params, handleChangePagination, setParams} =
    useSearchParams(paramsDefaultCommon);
  const {
    data: dataSchedule,
    isFetching,
    refetch,
  } = useQueryGetListSchedule(params);
  const {data: dataDoctor} = useQueryGetListDoctor(QUERY_PARAMS);
  const {mutate: DeleteScheduleMutation} = useDeleteSchedule();

  const listDoctorFilter = useMemo(() => {
    const filteredDoctors = dataDoctor?.payload?.data.filter((v) => {
      return dataSchedule?.payload?.data.some(
        (d) => d.doctor_id === v.doctor_id,
      );
    });
    return filteredDoctors?.map((v) => ({
      value: v.doctor_id,
      label: v.name,
    }));
  }, [dataSchedule, dataDoctor]);

  const handleOpenModalSchedule = (id?: string) => {
    addModal({
      content: id ? (
        <ContentModalEditSchedule idSelect={id} refetch={refetch} />
      ) : (
        <ContentModalCreateSchedule refetch={refetch} />
      ),
      options: {
        title: (id ? "Sửa" : "Tạo") + " lịch trình",
        widthModal: 600,
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
  let columns: ColumnsType<IScheduleBody> = [];
  if (user?.role === IAccountRole.ADMIN) {
    columns = [
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
        title: "Chuyên khoa làm việc",
        dataIndex: "specialty",
        key: "specialty",
        align: "center",
        render: (_, record) => {
          const doctor = dataDoctor?.payload.data.find(
            (doctor) => doctor.doctor_id === record.doctor_id,
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
  } else {
    columns = [
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
        title: "Chuyên khoa làm việc",
        dataIndex: "specialty",
        key: "specialty",
        align: "center",
        render: (_, record) => {
          const doctor = dataDoctor?.payload.data.find(
            (doctor) => doctor.doctor_id === record.doctor_id,
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
    ];
  }

  return (
    <>
      <HeaderToolTable
        searchFilterBox={[
          <InputFilterGlobal
            key="filter"
            options={listDoctorFilter}
            placeholder="Tìm kiếm theo tên bác sĩ"
            params={params}
            filterField={"doctor"}
            handleChange={setParams}
          />,
        ]}
        buttonBox={
          user?.role === IAccountRole.ADMIN
            ? [
                <ButtonAdd
                  title="Tạo lịch trình"
                  key="button-add"
                  onClick={() => handleOpenModalSchedule()}
                />,
              ]
            : []
        }
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
