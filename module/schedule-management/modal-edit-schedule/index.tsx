"use client";
import {QUERY_PARAMS} from "@/apiRequest/common";
import FormItem from "@/components/FormItem";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";
import QUERY_KEY from "@/config/QUERY_KEY";
import {
  IEditScheduleForm,
  getValidationEditScheduleSchema,
} from "@/module/schedule-management/modal-edit-schedule/form-config";
import {closeModal} from "@/redux/slices/ModalSlice";
import {useAppDispatch} from "@/redux/store";
import {IModalProps} from "@/types";
import {OPTIONS} from "@/utils/constants/selectList";
import {useQueryGetListDoctor} from "@/utils/hooks/doctor";
import {useQueryGetListHospital} from "@/utils/hooks/hospital";
import {
  useQueryGetScheduleById,
  useUpdateSchedule,
} from "@/utils/hooks/schedule";
import {useQueryClient} from "@tanstack/react-query";
import {Col, DatePicker, Form, Row, Select} from "antd";
import dayjs from "dayjs";
import {Formik, FormikHelpers} from "formik";
import {useEffect, useMemo, useState} from "react";

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
  const queryClient = useQueryClient();
  const {mutate: EditScheduleMutation} = useUpdateSchedule();

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

  const initialValues: IEditScheduleForm = useMemo(() => {
    const data = doctorByID?.payload?.data;
    return {
      hospital_id: hospitalSelected,
      doctor_id: data?.doctor_id ?? "",
      date: data?.date ?? "",
      time_type: data?.time_type ?? [],
    };
  }, [doctorByID]);

  const handleEditSchedule = (
    values: IEditScheduleForm,
    {setSubmitting}: FormikHelpers<IEditScheduleForm>,
  ) => {
    const data = {
      ...values,
      hospital_id: hospitalSelected,
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

  if (!doctorByID || !dataDoctor || !dataHospital) return;
  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      validationSchema={getValidationEditScheduleSchema()}
      onSubmit={handleEditSchedule}
    >
      {({isSubmitting, handleSubmit, setFieldValue, values}): JSX.Element => (
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
                    disabled={true}
                    options={listHospital}
                    placeholder="Chọn bệnh viện"
                    onChange={(e) => {
                      setHospitalSelected(e);
                      setFieldValue("hospital_id", e);
                    }}
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
                    disabled={true}
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
