"use client";
import {ISpecialtyBody} from "@/apiRequest/ApiSpecialty";
import {IUserLogin} from "@/apiRequest/ApiUser";
import FormItem from "@/components/FormItem";
import {
  InputGlobal,
  InputNumberGlobal,
  TextAreaGlobal,
} from "@/components/InputGlobal";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";
import {
  ICreateDoctorForm,
  getValidationCreateDoctorSchema,
} from "@/module/doctor-management/modal-create-doctor/form-config";
import {closeModal} from "@/redux/slices/ModalSlice";
import {useAppDispatch} from "@/redux/store";
import {IAccountRole} from "@/types";
import {useQueryGetFullUser} from "@/utils/hooks/auth";
import {useCreateDoctor, useQueryGetListDoctor} from "@/utils/hooks/doctor";
import {Col, Form, Row, Select} from "antd";
import {Formik, FormikHelpers} from "formik";
import {useMemo, useState} from "react";

interface ICreateDoctorProps {
  listHospital: {value?: string; label?: JSX.Element}[];
  dataSpecialties: ISpecialtyBody[];
  refetch: () => void;
}

const QUERY_PARAMS = {page: 1, limit: 99};

export default function ContentModalCreateDoctor({
  refetch,
  listHospital,
  dataSpecialties,
}: ICreateDoctorProps) {
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const {mutate: CreateDoctorMutation} = useCreateDoctor();
  const {data: users} = useQueryGetFullUser(QUERY_PARAMS);
  const {data: doctorSource} = useQueryGetListDoctor(QUERY_PARAMS);

  const initialValues: ICreateDoctorForm = {
    doctor_id: "",
    hospital_id: "",
    specialty_id: "",
    description: "",
    therapy: "",
    price: 0,
    session: "",
  };

  const doctors = useMemo(() => {
    return users?.payload?.data
      .filter((u) => u.role === IAccountRole.DOCTOR)
      .reduce((acc: IUserLogin[], curr) => {
        const isDifferent = !doctorSource?.payload?.data.some(
          (otherObj) =>
            curr._id === otherObj.doctor_id && curr.name === otherObj.name,
        );
        if (isDifferent) {
          acc.push(curr);
        }
        return acc;
      }, []);
  }, [users, doctorSource]);

  const listDoctor = doctors?.map((d) => ({value: d._id, label: d.name}));

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
                  <InputNumberGlobal
                    name="price"
                    step={1000}
                    formatter={(value): string =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    placeholder="Nhập giá tiền"
                    parser={(value): string =>
                      value!.replace(/\$\s?|(,*)/g, "")
                    }
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
