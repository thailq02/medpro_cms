"use client";
import React from "react";
import TableGlobal from "@/components/TableGlobal";
import HeaderToolTable from "@/components/HeaderToolTable";
import {InputSearchGlobal} from "@/components/InputSearchGlobal";
import {
  ActionButton,
  ButtonAdd,
  EButtonAction,
} from "@/components/ButtonGlobal";
import {Row, Space, Image} from "antd";
import {ColumnsType} from "antd/es/table";
import {addModal} from "@/components/ModalGlobal";
import ContentModalCreateMedicalBookingForms from "@/module/medical-booking-forms-management/modal-create-medical-booking-forms";
import ContentModalEditMedicalBookingForms from "@/module/medical-booking-forms-management/modal-edit-medical-booking-forms";
import {
  useDeleteMedicalBookingForms,
  useQueryGetListMedicalBookingForms,
} from "@/utils/hooks/medical-booking-forms";
import {IMedicalBookingFormsRes} from "@/apiRequest/ApiMedicalBookingForms";
import useSearchParams, {
  paramsDefaultCommon,
} from "@/utils/hooks/searchParams/useSearchParams";

export default function MedicalBookingFormsManagement() {
  const {params, handleChangePagination, setSearchValue} =
    useSearchParams(paramsDefaultCommon);

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
      width: 100,
      render: (_, record) => {
        return (
          <div>
            <Image
              style={{objectFit: "cover"}}
              src={record.image || "img/image.png"}
              fallback="img/image.png"
            />
          </div>
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
          <InputSearchGlobal
            key="search"
            placeholder="Tìm kiếm theo tên"
            onSearch={(value) => setSearchValue(value)}
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
