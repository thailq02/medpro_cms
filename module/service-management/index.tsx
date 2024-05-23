"use client";
import React, {useMemo} from "react";
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
import ContentModalCreateService from "@/module/service-management/modal-create-service";
import ContentModalEditService from "@/module/service-management/mocal-edit-service";
import {useDeleteService, useQueryGetListService} from "@/utils/hooks/service";
import useSearchParams, {
  paramsDefaultCommon,
} from "@/utils/hooks/searchParams/useSearchParams";
import {IServiceBody} from "@/apiRequest/ApiService";
import {useQueryGetListHospital} from "@/utils/hooks/hospital";

export default function ServiceManagement() {
  const {params, handleChangePagination} = useSearchParams(paramsDefaultCommon);
  const {data: services, isFetching, refetch} = useQueryGetListService(params);
  const {data: hospitals} = useQueryGetListHospital({page: 1, limit: 99});
  const {mutate: DeleteServiceMutation} = useDeleteService();

  const listHospital = useMemo(() => {
    return hospitals?.payload.data.map((item) => ({
      value: item._id,
      label: item.name,
    }));
  }, [hospitals]);

  const handleOpenModalSerive = (id?: string) => {
    addModal({
      content: id ? (
        <ContentModalEditService
          idSelect={id}
          listHospital={listHospital ?? []}
          refetch={refetch}
        />
      ) : (
        <ContentModalCreateService
          listHospital={listHospital ?? []}
          refetch={refetch}
        />
      ),
      options: {title: (id ? "Sửa" : "Tạo") + " dịch vụ", widthModal: 800},
    });
  };

  const handleDeleteService = (id: string) => {
    DeleteServiceMutation(id, {
      onSuccess: () => refetch(),
    });
  };
  const columns: ColumnsType<IServiceBody> = [
    {
      title: "STT",
      dataIndex: "_id",
      key: "_id",
      width: 80,
      align: "center",
      fixed: "left",
      render: (_: any, record: any, index: any) => (
        <div>{index + (params.page - 1) * params.limit + 1}</div>
      ),
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      align: "center",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Thuộc bệnh viện",
      dataIndex: ["hospital", "name"],
      key: "own_hospital",
      align: "center",
    },
    {
      title: "Thuộc chuyên khoa",
      dataIndex: ["specialty", "name"],
      key: "own_specialty",
      align: "center",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "price",
      align: "center",
      width: 200,
    },
    {
      title: "Lịch làm việc",
      dataIndex: "session",
      key: "session",
      align: "center",
      width: 250,
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      width: 150,
      align: "center",
      fixed: "right",
      render: (_, record) => {
        return (
          <Row justify="center">
            <Space direction="horizontal" size={"middle"}>
              <ActionButton
                type={EButtonAction.EDIT}
                onClick={() => handleOpenModalSerive(record._id)}
              />
              <ActionButton
                type={EButtonAction.DELETE}
                onClick={() => handleDeleteService(record._id as string)}
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
            title="Tạo dịch vụ"
            onClick={() => handleOpenModalSerive()}
          />,
        ]}
      />
      <TableGlobal
        scrollX={2000}
        dataSource={services?.payload.data}
        columns={columns}
        onChange={handleChangePagination}
        pagination={{
          total: services?.payload.meta.total_items,
          current: services?.payload.meta.current_page,
          pageSize: services?.payload.meta.limit,
        }}
        loading={isFetching}
      />
    </>
  );
}
