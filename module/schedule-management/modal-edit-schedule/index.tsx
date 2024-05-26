"use client";
import React, {useEffect, useMemo, useState} from "react";
import {Formik, FormikHelpers} from "formik";
import {Col, DatePicker, Form, Row, Select} from "antd";
import FormItem from "@/components/FormItem";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";
import {InputGlobal} from "@/components/InputGlobal";
import {useQueryGetListHospital} from "@/utils/hooks/hospital";
import {useQueryGetListDoctor} from "@/utils/hooks/doctor";
import {OPTIONS} from "@/utils/constants/selectList";
import dayjs from "dayjs";
import {
  useQueryGetScheduleById,
  useUpdateSchedule,
} from "@/utils/hooks/schedule";
import {useAppDispatch} from "@/redux/store";
import {closeModal} from "@/redux/slices/ModalSlice";
import {IModalProps} from "@/types";
import {
  IEditScheduleForm,
  getValidationEditScheduleSchema,
} from "@/module/schedule-management/modal-edit-schedule/form-config";

const QUERY_PARAMS = {page: 1, limit: 99};

export default function ContentModalEditSchedule({
  refetch,
  idSelect,
}: IModalProps) {
  const dispatch = useAppDispatch();
  const [hospitalSelected, setHospitalSelected] = useState<string>("");
  const [listDoctor, setListDoctor] = useState<
    {value: string; label: string}[]
  >([]);

  const {data: dataHospital} = useQueryGetListHospital(QUERY_PARAMS);
  const {data: dataDoctor} = useQueryGetListDoctor(QUERY_PARAMS);
  const {data: doctorByID} = useQueryGetScheduleById(idSelect as string);

  const {mutate: EditScheduleMutation} = useUpdateSchedule();

  const initialValues: IEditScheduleForm = useMemo(() => {
    const data = doctorByID?.payload?.data;
    return {
      doctor_id: data?.doctor_id ?? "",
      current_number: data?.current_number ?? 0,
      max_number: data?.max_number ?? 100,
      date: data?.date ?? "",
      time_type: data?.time_type ?? [],
    };
  }, [doctorByID]);

  useEffect(() => {
    if (doctorByID?.payload?.data?.doctor_id) {
      dataDoctor?.payload?.data?.find((item) => {
        if (item.doctor_id === doctorByID?.payload?.data?.doctor_id) {
          setHospitalSelected(item.hospital_id as string);
        }
      });
    }
  }, [doctorByID]);

  useEffect(() => {
    if (
      dataDoctor?.payload?.data &&
      dataHospital?.payload?.data &&
      hospitalSelected
    ) {
      const doctors = dataDoctor?.payload?.data
        .filter((item) => item.hospital_id === hospitalSelected)
        .map((item) => ({
          value: item.doctor_id,
          label: item.name,
        }));
      setListDoctor(doctors as {value: string; label: string}[]);
    }
  }, [dataHospital, dataDoctor, hospitalSelected]);

  const listHospital = useMemo(() => {
    return dataHospital?.payload?.data.map((item) => ({
      value: item._id,
      label: item.name,
    }));
  }, [dataHospital]);

  const handleEditSchedule = (
    values: IEditScheduleForm,
    {setSubmitting}: FormikHelpers<IEditScheduleForm>,
  ) => {
    EditScheduleMutation(
      {
        id: idSelect as string,
        body: values,
      },
      {
        onSuccess: () => {
          dispatch(closeModal());
          refetch && refetch();
        },
        onError: () => setSubmitting(false),
      },
    );
  };

  if (!doctorByID || !dataDoctor || !dataHospital) return;
  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      validationSchema={getValidationEditScheduleSchema()}
      onSubmit={handleEditSchedule}
    >
      {({
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
        values,
      }): JSX.Element => (
        <div className="modal-form-custom">
          <Form onFinish={handleSubmit} labelAlign="left">
            <Row gutter={24}>
              <Col span={24}>
                <FormItem
                  label="Chọn bệnh viện"
                  name="hospital_id"
                  required
                  labelCol={{span: 24}}
                >
                  <Select
                    options={listHospital}
                    placeholder="Chọn bệnh viện"
                    onChange={(e) => setHospitalSelected(e)}
                    value={hospitalSelected}
                  />
                </FormItem>
                <FormItem
                  label="Chọn bác sĩ"
                  name="doctor_id"
                  required
                  labelCol={{span: 24}}
                >
                  <Select
                    disabled={!hospitalSelected}
                    options={listDoctor}
                    placeholder="Chọn bác sĩ"
                    onChange={(e) => setFieldValue("doctor_id", e)}
                    value={values.doctor_id}
                  />
                </FormItem>
                <FormItem
                  label="Ngày làm việc"
                  name="date"
                  required
                  labelCol={{span: 24}}
                >
                  <DatePicker
                    format="DD/MM/YYYY"
                    placeholder="Chọn ngày làm việc"
                    onChange={(e) => {
                      const date = dayjs(e.toString()).format("DD/MM/YYYY");
                      setFieldValue("date", date);
                    }}
                    value={
                      values.date ? dayjs(values.date, "DD/MM/YYYY") : null
                    }
                  />
                </FormItem>
                <FormItem
                  label="Chọn ca làm việc"
                  name="time_type"
                  required
                  labelCol={{span: 24}}
                >
                  <Select
                    mode="multiple"
                    placeholder="Chọn ca làm việc trong ngày"
                    style={{width: "100%"}}
                    options={OPTIONS.LIST_SCHEDULE_TYPE}
                    onChange={(e) => setFieldValue("time_type", e)}
                    value={values.time_type}
                  />
                </FormItem>
                <FormItem
                  label="Số bệnh nhân hiện tại"
                  name="current_number"
                  required
                  labelCol={{span: 24}}
                >
                  <InputGlobal
                    type="number"
                    name="current_number"
                    placeholder="Nhập số bệnh nhân hiện tại"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.current_number}
                  />
                </FormItem>
                <FormItem
                  label="Số bệnh nhân tối đa"
                  name="max_number"
                  required
                  labelCol={{span: 24}}
                >
                  <InputGlobal
                    type="number"
                    defaultValue={100}
                    name="max_number"
                    placeholder="Nhập số bệnh nhân tối đa nhận"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.max_number}
                  />
                </FormItem>
              </Col>
            </Row>
            <FooterModalButton
              textOk="Tạo lịch trình"
              onOk={handleSubmit}
              isLoading={isSubmitting}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
}
