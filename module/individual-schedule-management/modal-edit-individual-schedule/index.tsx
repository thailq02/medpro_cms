"use client";
import React, {useMemo} from "react";
import {Formik, FormikHelpers} from "formik";
import {Col, DatePicker, Form, Row, Select} from "antd";
import FormItem from "@/components/FormItem";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";
import {OPTIONS} from "@/utils/constants/selectList";
import dayjs from "dayjs";
import {
  useQueryGetScheduleById,
  useUpdateSchedule,
} from "@/utils/hooks/schedule";
import {useAppDispatch} from "@/redux/store";
import {closeModal} from "@/redux/slices/ModalSlice";
import {IModalProps} from "@/types";
import {useQueryClient} from "@tanstack/react-query";
import QUERY_KEY from "@/config/QUERY_KEY";
import {useQueryGetDoctorById} from "@/utils/hooks/doctor";
import {
  IEditIndividualScheduleForm,
  getValidationEditIndividualScheduleSchema,
} from "@/module/individual-schedule-management/modal-edit-individual-schedule/form-config";

export default function ContentModalEditIndividualSchedule({
  refetch,
  idSelect,
  doctorId,
}: IModalProps & {doctorId: string}) {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const {data: scheduleById} = useQueryGetScheduleById(idSelect as string);
  const {data: doctorById} = useQueryGetDoctorById(doctorId);
  const {mutate: EditScheduleMutation} = useUpdateSchedule();

  const initialValues: IEditIndividualScheduleForm = useMemo(() => {
    const data = scheduleById?.payload?.data;
    return {
      hospital_id: doctorById?.payload?.data?.hospital_id,
      doctor_id: data?.doctor_id ?? doctorId,
      date: data?.date ?? "",
      time_type: data?.time_type ?? [],
    };
  }, [scheduleById, doctorById]);

  const handleEditIndividualSchedule = (
    values: IEditIndividualScheduleForm,
    {setSubmitting}: FormikHelpers<IEditIndividualScheduleForm>,
  ) => {
    const data = {
      ...values,
      hospital_id: doctorById?.payload?.data?.hospital_id,
    };
    EditScheduleMutation(
      {
        id: idSelect as string,
        body: data,
      },
      {
        onSuccess: () => {
          queryClient.refetchQueries({
            queryKey: [QUERY_KEY.GET_SCHEDULE_BY_ID, idSelect],
          });
          dispatch(closeModal());
          refetch && refetch();
        },
        onError: () => setSubmitting(false),
      },
    );
  };

  if (!scheduleById || !doctorById) return;
  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      validationSchema={getValidationEditIndividualScheduleSchema()}
      onSubmit={handleEditIndividualSchedule}
    >
      {({isSubmitting, handleSubmit, setFieldValue, values}): JSX.Element => (
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
                    value={
                      values.date ? dayjs(values.date, "DD/MM/YYYY") : null
                    }
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
                    value={values.time_type}
                  />
                </FormItem>
              </Col>
            </Row>
            <FooterModalButton
              textOk="Sửa lịch trình"
              onOk={handleSubmit}
              isLoading={isSubmitting}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
}
