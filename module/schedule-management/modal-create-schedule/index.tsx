"use client";
import {QUERY_PARAMS} from "@/apiRequest/common";
import FormItem from "@/components/FormItem";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";
import {
  ICreateScheduleForm,
  getValidationCreateScheduleSchema,
} from "@/module/schedule-management/modal-create-schedule/form-config";
import {closeModal} from "@/redux/slices/ModalSlice";
import {useAppDispatch} from "@/redux/store";
import {OPTIONS} from "@/utils/constants/selectList";
import {useQueryGetListDoctor} from "@/utils/hooks/doctor";
import {useQueryGetListHospital} from "@/utils/hooks/hospital";
import {useCreateSchedule} from "@/utils/hooks/schedule";
import {Col, DatePicker, Form, Row, Select} from "antd";
import dayjs from "dayjs";
import {Formik, FormikHelpers} from "formik";
import {useEffect, useMemo, useState} from "react";

interface ICreateScheduleProps {
  refetch: () => void;
}

export default function ContentModalCreateSchedule({
  refetch,
}: ICreateScheduleProps) {
  const dispatch = useAppDispatch();
  const [hospitalSelected, setHospitalSelected] = useState<string | undefined>(
    undefined,
  );
  const [listDoctor, setListDoctor] = useState<
    {value: string; label: string}[]
  >([]);
  const {data: dataHospital} = useQueryGetListHospital(QUERY_PARAMS);
  const {data: dataDoctor} = useQueryGetListDoctor(QUERY_PARAMS);
  const {mutate: CreateScheduleMutation} = useCreateSchedule();
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

  const handleCreateSchedule = (
    values: ICreateScheduleForm,
    {setSubmitting}: FormikHelpers<ICreateScheduleForm>,
  ) => {
    CreateScheduleMutation(values, {
      onSuccess: () => {
        dispatch(closeModal());
        refetch && refetch();
      },
      onError: () => setSubmitting(false),
    });
  };

  const initialValues: ICreateScheduleForm = {
    hospital_id: "",
    doctor_id: "",
    date: "",
    time_type: [],
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      validationSchema={getValidationCreateScheduleSchema()}
      onSubmit={handleCreateSchedule}
    >
      {({
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
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
                    onChange={(e) => {
                      setFieldValue("hospital_id", e);
                      setHospitalSelected(e);
                    }}
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
