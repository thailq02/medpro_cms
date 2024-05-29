"use client";
import React, {useMemo} from "react";
import TableGlobal from "@/components/TableGlobal";
import {ColumnsType} from "antd/es/table";
import {
   ActionButton,
   ButtonAdd,
   EButtonAction,
} from "@/components/ButtonGlobal";
import {Row, Space} from "antd";
import {InputFilterGlobal} from "@/components/InputFilterGlobal";
import HeaderToolTable from "@/components/HeaderToolTable";
import {addModal} from "@/components/ModalGlobal";
import {
   useDeleteSchedule,
   useQueryGetListSchedule,
} from "@/utils/hooks/schedule";
import {useQueryGetListDoctor} from "@/utils/hooks/doctor";
import {IScheduleBody} from "@/apiRequest/ApiSchedule";
import ContentModalCreateSchedule from "@/module/schedule-management/modal-create-schedule";
import ContentModalEditSchedule from "@/module/schedule-management/modal-edit-schedule";
import useSearchParams, {
   paramsDefaultCommon,
} from "@/utils/hooks/searchParams/useSearchParams";
import sortTimes from "@/utils/helper/SortTimesHelper";

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

export default function ScheduleManagement() {
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

   const listDateFilter = useMemo(() => {
      const uniqueDates = new Set();
      dataSchedule?.payload?.data.forEach((v) => {
         uniqueDates.add(v.date);
      });
      return Array.from(uniqueDates).map(
         (date) =>
            ({value: date, label: date}) as {
               value: string;
               label: string;
            },
      );
   }, [dataSchedule]);

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
                        onClick={() =>
                           handleDeleteSchedule(record._id as string)
                        }
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
               <InputFilterGlobal
                  key="filter"
                  options={listDoctorFilter}
                  placeholder="Tìm kiếm theo tên bác sĩ"
                  params={params}
                  filterField={"doctor"}
                  handleChange={setParams}
               />,
               <InputFilterGlobal
                  key="filter"
                  options={listDateFilter}
                  placeholder="Tìm kiếm theo ngày"
                  params={params}
                  filterField={"date"}
                  handleChange={setParams}
               />,
            ]}
            buttonBox={[
               <ButtonAdd
                  title="Tạo lịch trình"
                  onClick={() => handleOpenModalSchedule()}
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
