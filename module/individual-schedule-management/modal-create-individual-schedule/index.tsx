"use client";
import React from "react";
import {Formik, FormikHelpers} from "formik";
import {Col, DatePicker, Form, Row, Select} from "antd";
import FormItem from "@/components/FormItem";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";
import {useQueryGetDoctorById} from "@/utils/hooks/doctor";
import {OPTIONS} from "@/utils/constants/selectList";
import dayjs from "dayjs";
import {useCreateSchedule} from "@/utils/hooks/schedule";
import {useAppDispatch} from "@/redux/store";
import {closeModal} from "@/redux/slices/ModalSlice";
import {
  ICreateIndividualScheduleForm,
  getValidationCreateIndividualScheduleSchema,
} from "@/module/individual-schedule-management/modal-create-individual-schedule/form-config";

interface ICreateIndividualSchedule {
  refetch: () => void;
  doctorId: string;
}

export default function ContentModalCreateIndividualSchedule({
  refetch,
  doctorId,
}: ICreateIndividualSchedule) {
  const dispatch = useAppDispatch();
  const {mutate: CreateIndividualScheduleMutation} = useCreateSchedule();
  const {data: dataDoctor} = useQueryGetDoctorById(doctorId ?? "");

  const handleCreateIndividualSchedule = (
    values: ICreateIndividualScheduleForm,
    {setSubmitting}: FormikHelpers<ICreateIndividualScheduleForm>,
  ) => {
    CreateIndividualScheduleMutation(values, {
      onSuccess: () => {
        dispatch(closeModal());
        refetch && refetch();
      },
      onError: () => setSubmitting(false),
    });
  };

  const initialValues: ICreateIndividualScheduleForm = {
    hospital_id: dataDoctor?.payload?.data?.hospital_id ?? "",
    doctor_id: dataDoctor?.payload?.data?.doctor_id ?? "",
    date: "",
    time_type: [],
  };

  if (!dataDoctor) return;
  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      validationSchema={getValidationCreateIndividualScheduleSchema()}
      onSubmit={handleCreateIndividualSchedule}
    >
      {({isSubmitting, handleSubmit, setFieldValue}): JSX.Element => (
        <div className="modal-form-custom">
          <Form onFinish={handleSubmit} labelAlign="left">
            <Row gutter={24}>
              <Col span={24}>
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
                    disabledDate={(current) =>
                      current && current.isBefore(dayjs().startOf("day"))
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
