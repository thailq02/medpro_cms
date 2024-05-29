"use client";
import React, {useMemo} from "react";
import TableGlobal from "@/components/TableGlobal";
import HeaderToolTable from "@/components/HeaderToolTable";
import {InputSearchGlobal} from "@/components/InputSearchGlobal";
import {InputFilterGlobal} from "@/components/FormItem/InputFilterGlobal";
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
import {
   useDeleteSpecialty,
   useQueryGetListSpecialty,
} from "@/utils/hooks/specialty";
import useSearchParams, {
   paramsDefaultCommon,
} from "@/utils/hooks/searchParams/useSearchParams";
import {useQueryGetListHospital} from "@/utils/hooks/hospital";
import {ISpecialtyBody} from "@/apiRequest/ApiSpecialty";

export default function SpecialtyManagement() {
   const {params, handleChangePagination, setSearchValue, setParams} =
      useSearchParams(paramsDefaultCommon);
   const {
      data: specialties,
      isFetching,
      refetch,
   } = useQueryGetListSpecialty(params);
   const {data: hospitals} = useQueryGetListHospital({page: 1, limit: 99});

   const {mutate: DeleteSpecialtyMutation} = useDeleteSpecialty();

   const listHospital = useMemo(() => {
      return hospitals?.payload.data.map((item) => ({
         value: item._id,
         label: item.name,
      }));
   }, [hospitals]);

   const handleOpenModalSpecialty = (id?: string) => {
      addModal({
         content: id ? (
            <ContentModalEditSpecialty
               idSelect={id}
               listHospital={listHospital ?? []}
               refetch={refetch}
            />
         ) : (
            <ContentModalCreateSpecialty
               listHospital={listHospital ?? []}
               refetch={refetch}
            />
         ),
         options: {title: (id ? "Sửa" : "Tạo") + " chuyên khoa"},
      });
   };
   const handleDeleteSpecialty = (id: string) => {
      DeleteSpecialtyMutation(id, {
         onSuccess: () => refetch(),
      });
   };
   const columns: ColumnsType<ISpecialtyBody> = [
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
         title: "Tên chuyên khoa",
         dataIndex: "name",
         key: "name",
         align: "center",
      },
      {
         title: "Bệnh viện",
         dataIndex: ["hospital", "name"],
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
                        onClick={() => handleOpenModalSpecialty(record._id)}
                     />
                     <ActionButton
                        type={EButtonAction.DELETE}
                        onClick={() =>
                           handleDeleteSpecialty(record._id as string)
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
               <InputSearchGlobal
                  key="search"
                  onSearch={setSearchValue}
                  placeholder="Tìm kiếm chuyên khoa"
               />,
               <InputFilterGlobal
                  key="filter"
                  options={listHospital}
                  params={params}
                  filterField="hospital"
                  placeholder="Tìm kiếm bệnh viện"
                  handleChange={setParams}
               />,
            ]}
            buttonBox={[
               <ButtonAdd
                  title="Tạo chuyên khoa"
                  onClick={() => handleOpenModalSpecialty()}
               />,
            ]}
         />
         <TableGlobal
            dataSource={specialties?.payload.data}
            columns={columns}
            onChange={handleChangePagination}
            loading={isFetching}
            pagination={{
               total: specialties?.payload.meta.total_items,
               current: specialties?.payload.meta.current_page,
               pageSize: specialties?.payload.meta.limit,
            }}
         />
      </>
   );
}
