"use client";
import React, {useState} from "react";
import {Formik, FormikHelpers} from "formik";
import {Col, Form, Row, Select} from "antd";
import FormItem from "@/components/FormItem";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";
import {IUserLogin} from "@/apiRequest/ApiUser";
import {useQueryGetListSpecialty} from "@/utils/hooks/specialty";
import {
  ICreateDoctorForm,
  getValidationCreateDoctorSchema,
} from "@/module/doctor-management/modal-create-doctor/form-config";
import {InputGlobal, TextAreaGlobal} from "@/components/InputGlobal";
import {useCreateDoctor} from "@/utils/hooks/doctor";
import {useAppDispatch} from "@/redux/store";
import {closeModal} from "@/redux/slices/ModalSlice";
import {ISpecialtyBody} from "@/apiRequest/ApiSpecialty";

interface ICreateDoctorProps {
  doctors: IUserLogin[];
  listHospital: {value?: string; label?: string}[];
  dataSpecialties: ISpecialtyBody[];
  refetch: () => void;
}

export default function ContentModalCreateDoctor({
  doctors,
  refetch,
  listHospital,
  dataSpecialties,
}: ICreateDoctorProps) {
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const {mutate: CreateDoctorMutation} = useCreateDoctor();

  const initialValues: ICreateDoctorForm = {
    doctor_id: "",
    hospital_id: "",
    specialty_id: "",
    description: "",
    therapy: "",
    price: 0,
    session: "",
  };

  const listDoctor = doctors.map((d) => ({value: d._id, label: d.name}));

  const listSpecialty = dataSpecialties
    .filter((v) => v.hospital?._id === selectedHospital)
    .map((v) => ({
      value: v._id,
      label: v.name,
    }));

  const handleCreateDoctor = (
    values: ICreateDoctorForm,
    {setSubmitting}: FormikHelpers<ICreateDoctorForm>,
  ) => {
    CreateDoctorMutation(values, {
      onSuccess: () => {
        setSelectedHospital(null);
        dispatch(closeModal());
        refetch && refetch();
      },
      onError: () => {
        setSelectedHospital(null);
        setSubmitting(false);
      },
    });
  };
  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      validationSchema={getValidationCreateDoctorSchema()}
      onSubmit={handleCreateDoctor}
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
              <Col span={12}>
                <FormItem
                  label="Tên bác sĩ"
                  name="doctor_id"
                  required
                  labelCol={{span: 24}}
                >
                  <Select
                    allowClear
                    options={listDoctor}
                    placeholder="Chọn bác sĩ"
                    onChange={(value) => setFieldValue("doctor_id", value)}
                  />
                </FormItem>
                <FormItem
                  label="Giá tiền"
                  name="price"
                  required
                  labelCol={{span: 24}}
                >
                  <InputGlobal
                    name="price"
                    type="number"
                    placeholder="Nhập giá tiền"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormItem>
                <FormItem
                  label="Mô tả"
                  name="description"
                  required
                  labelCol={{span: 24}}
                >
                  <TextAreaGlobal
                    name="description"
                    placeholder="Nhập mô tả"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormItem>
                <FormItem
                  label="Chuyên trị"
                  name="therapy"
                  required
                  labelCol={{span: 24}}
                >
                  <TextAreaGlobal
                    name="therapy"
                    placeholder="Nhập chuyên trị"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="Bệnh viện trực thuộc"
                  name="hospital_id"
                  required
                  labelCol={{span: 24}}
                >
                  <Select
                    allowClear
                    options={listHospital}
                    placeholder="Chọn bệnh viện trực thuộc"
                    onChange={(value) => {
                      setSelectedHospital(value);
                      setFieldValue("hospital_id", value);
                    }}
                  />
                </FormItem>
                <FormItem
                  label="Chuyên khoa"
                  name="specialty_id"
                  required
                  labelCol={{span: 24}}
                >
                  <Select
                    allowClear
                    disabled={!selectedHospital}
                    options={listSpecialty}
                    placeholder="Chọn chuyên khoa"
                    onChange={(value) => setFieldValue("specialty_id", value)}
                  />
                </FormItem>
                <FormItem
                  label="Lịch làm việc"
                  name="session"
                  required
                  labelCol={{span: 24}}
                >
                  <InputGlobal
                    name="session"
                    placeholder="Nhập lịch làm việc"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormItem>
              </Col>
            </Row>
            <FooterModalButton
              textOk="Tạo bác sĩ"
              onOk={handleSubmit}
              isLoading={isSubmitting}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
}
