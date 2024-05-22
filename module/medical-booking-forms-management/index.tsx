"use client";
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
import {
  useDeleteMedicalBookingForms,
  useQueryGetListMedicalBookingForms,
} from "@/utils/hooks/medical-booking-forms";
import {IMedicalBookingFormsRes} from "@/apiRequest/ApiMedicalBookingForms";
import Image from "next/image";
import useSearchParams, {
  paramsDefaultCommon,
} from "@/utils/hooks/searchParams/useSearchParams";

export default function MedicalBookingForms() {
  const {params, handleChangePagination} = useSearchParams(paramsDefaultCommon);

  const {
    data: medicalBookingForms,
    isFetching,
    refetch,
  } = useQueryGetListMedicalBookingForms(params);

  const {mutate: DeleteMedicalBookingForms} = useDeleteMedicalBookingForms();

  const handleOpenModalMedicalBookingForms = (id?: string) => {
    addModal({
      content: id ? (
        <ContentModalEditMedicalBookingForms idSelect={id} refetch={refetch} />
      ) : (
        <ContentModalCreateMedicalBookingForms refetch={refetch} />
      ),
      options: {title: (id ? "Sửa" : "Tạo") + " hình thức đặt khám"},
    });
  };

  const handleDeleteMedicalBookingForms = (id: string) => {
    DeleteMedicalBookingForms(id, {
      onSuccess: () => refetch(),
    });
  };
  const columns: ColumnsType<IMedicalBookingFormsRes> = [
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
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      align: "center",
      width: 150,
      render: (_, record) => {
        return (
          <Image
            src={"/img/image.png"}
            alt={record?.name || ""}
            width={500}
            height={500}
            className={`${
              record?.image ? "h-[100px]" : "h-[75px]"
            } w-full object-cover`}
          />
        );
      },
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
                onClick={() => handleOpenModalMedicalBookingForms(record._id)}
              />
              <ActionButton
                type={EButtonAction.DELETE}
                onClick={() =>
                  handleDeleteMedicalBookingForms(record._id as string)
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
      <TableGlobal
        dataSource={medicalBookingForms?.payload.data}
        columns={columns}
        loading={isFetching}
        onChange={handleChangePagination}
        pagination={{
          total: medicalBookingForms?.payload.meta.total_items,
          current: medicalBookingForms?.payload.meta.current_page,
          pageSize: medicalBookingForms?.payload.meta.limit,
        }}
      />
    </>
  );
}
