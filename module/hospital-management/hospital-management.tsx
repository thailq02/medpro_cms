"use client";
import {IHospitalBody} from "@/apiRequest/ApiHospital";
import {
  ActionButton,
  ButtonAdd,
  EButtonAction,
} from "@/components/ButtonGlobal";
import HeaderToolTable from "@/components/HeaderToolTable";
import {InputSearchGlobal} from "@/components/InputSearchGlobal";
import {addModal} from "@/components/ModalGlobal";
import TableGlobal from "@/components/TableGlobal";
import ContentModalCreateHospital from "@/module/hospital-management/modal-create-hospital";
import ContentModalEditHospital from "@/module/hospital-management/modal-edit-hospital";
import {useQueryGetListCategory} from "@/utils/hooks/category";
import {useQueryGetListHospital} from "@/utils/hooks/hospital";
import {useQueryGetListMedicalBookingForms} from "@/utils/hooks/medical-booking-forms";
import useSearchParams, {
  paramsDefaultCommon,
} from "@/utils/hooks/searchParams/useSearchParams";
import {Image, Row, Space} from "antd";
import {ColumnsType} from "antd/es/table";
import {useMemo} from "react";
import "./index.scss";

const QUERY_FULL = {limit: 99, page: 1};

export default function HospitalManagement() {
  const {params, handleChangePagination, setSearchValue} =
    useSearchParams(paramsDefaultCommon);
  const {
    data: hospitals,
    isFetching,
    refetch,
  } = useQueryGetListHospital(params);
  const {data: medicalBookingForms} =
    useQueryGetListMedicalBookingForms(QUERY_FULL);
  const {data: categories} = useQueryGetListCategory(QUERY_FULL);

  const listCategories = useMemo(() => {
    return categories?.payload?.data.map((item) => ({
      value: item._id,
      label: <span key={item._id}>{item.name}</span>,
    }));
  }, [categories]);

  const listMedicalBookingForms = useMemo(() => {
    return medicalBookingForms?.payload?.data.map((item) => ({
      value: item._id,
      label: item.name,
    }));
  }, [medicalBookingForms]);

  const handleOpenModalHospital = (id?: string) => {
    addModal({
      content: id ? (
        <ContentModalEditHospital
          idSelect={id}
          refetch={refetch}
          listMedicalBookingForms={listMedicalBookingForms ?? []}
          listCategories={listCategories ?? []}
        />
      ) : (
        <ContentModalCreateHospital
          refetch={refetch}
          listMedicalBookingForms={listMedicalBookingForms ?? []}
          listCategories={listCategories ?? []}
        />
      ),
      options: {
        title: (id ? "Sửa" : "Tạo") + " bệnh viện",
        widthModal: 1000,
        classNames: "modal-container-hospital",
      },
    });
  };

  const columns: ColumnsType<IHospitalBody> = [
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
      title: "Ảnh",
      dataIndex: "avatar",
      key: "avatar",
      align: "center",
      width: 150,
      render: (_, record) => {
        return (
          <div>
            <Image
              style={{objectFit: "cover"}}
              src={record.avatar || "/img/image.png"}
              fallback="/img/image.png"
            />
          </div>
        );
      },
    },
    {
      title: "Tên bệnh viện",
      dataIndex: "name",
      key: "name",
      align: "center",
      fixed: "left",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Lịch làm việc",
      dataIndex: "session",
      key: "session",
      align: "center",
      width: 200,
      render: (_, record) => {
        return (
          <div>
            {record?.session}
            <br />
            <span className="font-semibold">
              {record?.start_time} - {record?.end_time}
            </span>
          </div>
        );
      },
    },
    {
      title: "Hotline",
      dataIndex: "hotline",
      key: "hotline",
      align: "center",
      width: 180,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      align: "center",
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
                onClick={() => handleOpenModalHospital(record._id)}
              />
              <ActionButton
                type={EButtonAction.DELETE}
                onClick={() => undefined}
              />
            </Space>
          </Row>
        );
      },
    },
  ];

  if (!hospitals) return;

  return (
    <>
      <HeaderToolTable
        searchFilterBox={[
          <InputSearchGlobal
            key="search"
            placeholder="Tìm kiếm theo tên bệnh viện"
            onSearch={(value) => setSearchValue(value)}
          />,
        ]}
        buttonBox={[
          <ButtonAdd
            title="Tạo bệnh viện"
            onClick={() => handleOpenModalHospital()}
          />,
        ]}
      />
      <TableGlobal
        scrollX={2000}
        dataSource={hospitals?.payload.data}
        columns={columns}
        onChange={handleChangePagination}
        pagination={{
          total: hospitals?.payload.meta.total_items,
          current: hospitals?.payload.meta.current_page,
          pageSize: hospitals?.payload.meta.limit,
        }}
        // onRow={(record) => {
        //   return {
        //     onClick: () => handleOpenModalHospital(record._id),
        //   };
        // }}
        loading={isFetching}
      />
    </>
  );
}
