"use client";
import {IDoctorBody} from "@/apiRequest/ApiDoctor";
import {QUERY_PARAMS} from "@/apiRequest/common";
import {
  ActionButton,
  ButtonAdd,
  EButtonAction,
} from "@/components/ButtonGlobal";
import HeaderToolTable from "@/components/HeaderToolTable";
import {InputFilterGlobal} from "@/components/InputFilterGlobal";
import {InputSearchGlobal} from "@/components/InputSearchGlobal";
import {addModal} from "@/components/ModalGlobal";
import TableGlobal from "@/components/TableGlobal";
import ContentModalCreateDoctor from "@/module/doctor-management/modal-create-doctor";
import ContentModalEditDoctor from "@/module/doctor-management/modal-edit-doctor";
import {PositionType} from "@/types";
import {OPTIONS} from "@/utils/constants/selectList";
import {useDeleteDoctor, useQueryGetListDoctor} from "@/utils/hooks/doctor";
import {useQueryGetListHospital} from "@/utils/hooks/hospital";
import useSearchParams, {
  paramsDefaultCommon,
} from "@/utils/hooks/searchParams/useSearchParams";
import {useQueryGetListSpecialty} from "@/utils/hooks/specialty";
import {Image, Row, Space} from "antd";
import {ColumnsType} from "antd/es/table";
import {useMemo} from "react";

export default function DoctorManagement() {
  const {params, handleChangePagination, setParams, setSearchValue} =
    useSearchParams(paramsDefaultCommon);
  const {data: hospitals} = useQueryGetListHospital(QUERY_PARAMS);
  const {data: specialties} = useQueryGetListSpecialty(QUERY_PARAMS);
  const {mutate: DeleteDoctorMutation} = useDeleteDoctor();

  const {
    data: doctorSource,
    isFetching,
    refetch,
  } = useQueryGetListDoctor(params);

  const listHospital = useMemo(() => {
    return hospitals?.payload.data.map((item) => ({
      value: item._id,
      label: <span>{item.name}</span>,
    }));
  }, [hospitals]);

  const listSpecialty = useMemo(() => {
    return specialties?.payload.data.map((v) => ({
      value: v._id,
      label: <span>{v.name}</span>,
    }));
  }, [specialties]);

  const handleOpenModalDoctor = (doctor_id?: string) => {
    addModal({
      content: doctor_id ? (
        <ContentModalEditDoctor
          idSelect={doctor_id}
          refetch={refetch}
          listHospital={listHospital ?? []}
          dataSpecialties={specialties?.payload.data ?? []}
        />
      ) : (
        <ContentModalCreateDoctor
          refetch={refetch}
          listHospital={listHospital ?? []}
          dataSpecialties={specialties?.payload.data ?? []}
        />
      ),
      options: {
        title: (doctor_id ? "Sửa" : "Tạo ") + " thông tin bác sĩ",
        widthModal: 900,
      },
    });
  };

  const handleDeleteDoctor = (doctor_id: string) => {
    DeleteDoctorMutation(doctor_id, {onSuccess: () => refetch()});
  };

  const columns: ColumnsType<IDoctorBody> = [
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
      title: "Image",
      dataIndex: "image",
      key: "image",
      align: "center",
      width: 150,
      fixed: "left",
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
      title: "Tên bác sĩ",
      dataIndex: "name",
      key: "name",
      align: "center",
      fixed: "left",
    },
    {
      title: "Trình độ",
      dataIndex: "position",
      key: "position",
      align: "center",
      width: 200,
      render: (_, record) => {
        if (record.position === PositionType.ASSOCIATE_PROFESSOR)
          return "Phó giáo sư";
        if (record.position === PositionType.DOCTOR) return "Tiến sĩ";
        if (record.position === PositionType.PROFESSOR) return "Giáo sư";
        if (record.position === PositionType.MASTER) return "Thạc sĩ";
      },
    },
    {
      title: "Tên chuyên khoa",
      dataIndex: ["specialty", "name"],
      key: "specialty",
      align: "center",
    },
    {
      title: "Bệnh viện",
      dataIndex: "hospital_id",
      key: "hospital_id",
      align: "center",
      render: (_, record) => {
        if (record.specialty?.hospital?._id === record.hospital_id) {
          return record.specialty?.hospital?.name;
        }
        return "";
      },
    },
    {
      title: "Chuyên trị",
      dataIndex: "therapy",
      key: "therapy",
      align: "center",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "price",
      align: "center",
      width: 200,
      render: (_, record) => {
        return <span>{record.price?.toLocaleString("en-US")} VNĐ</span>;
      },
    },
    {
      title: "Lịch làm việc",
      dataIndex: "session",
      key: "session",
      align: "center",
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
                onClick={() => handleOpenModalDoctor(record.doctor_id)}
              />
              <ActionButton
                type={EButtonAction.DELETE}
                onClick={() => handleDeleteDoctor(record.doctor_id as string)}
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
            onSearch={(v) => setSearchValue(v)}
            placeholder="Tìm kiếm theo tên bác sĩ"
          />,
          <InputFilterGlobal
            key="filter"
            params={params}
            filterField="hospital"
            options={listHospital}
            placeholder="Tìm kiếm bệnh viện"
            handleChange={setParams}
          />,
          <InputFilterGlobal
            key="filter"
            params={params}
            filterField="specialty"
            options={listSpecialty}
            placeholder="Tìm kiếm chuyên khoa"
            handleChange={setParams}
          />,
          <InputFilterGlobal
            key="filter"
            params={params}
            filterField="position"
            options={OPTIONS.LIST_POSITION_DOCTOR}
            placeholder="Chọn trình độ"
            handleChange={setParams}
          />,
        ]}
        buttonBox={[
          <ButtonAdd
            title="Tạo bác sĩ"
            onClick={() => handleOpenModalDoctor()}
          />,
        ]}
      />
      <TableGlobal
        scrollX={2000}
        dataSource={doctorSource?.payload.data}
        columns={columns}
        onChange={handleChangePagination}
        pagination={{
          total: doctorSource?.payload.meta.total_items,
          current: doctorSource?.payload.meta.current_page,
          pageSize: doctorSource?.payload.meta.limit,
        }}
        loading={isFetching}
      />
    </>
  );
}
