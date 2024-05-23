"use client";
import React, {useMemo} from "react";
import {Formik, FormikHelpers} from "formik";
import {Col, Form, Image, Row, Select, TimePicker} from "antd";
import FormItem from "@/components/FormItem";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";
import {InputGlobal, TextAreaGlobal} from "@/components/InputGlobal";
import {OPTIONS} from "@/utils/constants/selectList";
import {
  ICreateHospital,
  getValidationCreateHospitalSchema,
} from "@/module/hospital-management/modal-create-hospital/form-config";
import {useCreateHospital} from "@/utils/hooks/hospital";
import {useAppDispatch} from "@/redux/store";
import {closeModal} from "@/redux/slices/ModalSlice";
import {autoSlugify} from "@/utils/constants/checkSlugify";

interface IHospitalProps {
  refetch?: () => void;
  listMedicalBookingForms: {
    value?: string;
    label?: string;
  }[];
  listCategories: {
    value?: string;
    label?: JSX.Element;
  }[];
}

export default function ContentModalCreateHospital({
  refetch,
  listMedicalBookingForms,
  listCategories,
}: IHospitalProps) {
  const dispatch = useAppDispatch();
  const {mutate: CreateHospitalMutation} = useCreateHospital();
  const handleCreateHospital = (
    values: ICreateHospital,
    {setSubmitting}: FormikHelpers<any>,
  ) => {
    const data = Boolean(values.slug)
      ? values
      : {
          ...values,
          slug: autoSlugify(values.name),
        };
    CreateHospitalMutation(data, {
      onSuccess: () => {
        dispatch(closeModal());
        refetch && refetch();
      },
      onError: () => setSubmitting(false),
    });
  };
  const initialValues = useMemo(() => {
    return {
      categoryId: "",
      name: "",
      slug: "",
      description: "",
      session: "",
      hotline: "",
      address: "",
      avatar: "",
      banner: "",
      images: [],
      start_time: "",
      end_time: "",
      types: [],
      booking_forms: [],
    };
  }, []);
  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      validationSchema={getValidationCreateHospitalSchema()}
      onSubmit={handleCreateHospital}
    >
      {({
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
      }): JSX.Element => (
        <div className="modal-form-custom modal-form-hospital">
          <div className="avatar-container mb-3">
            <Image
              width={150}
              height={150}
              src={undefined || "/img/avatar/avatar.jpg"}
              style={{borderRadius: "50%", objectFit: "cover"}}
              fallback="/img/avatar/avatar.jpg"
            />
          </div>
          <Form onFinish={handleSubmit} labelAlign="left" className="relative">
            <Row gutter={24} className="modal-create-hospital !h-[350px]">
              <Col span={12}>
                <FormItem
                  label="Tên bệnh viện"
                  name="name"
                  required
                  labelCol={{span: 24}}
                >
                  <InputGlobal
                    name="name"
                    placeholder="Nhập tên bệnh viện"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormItem>
                <FormItem
                  label="Slug"
                  name="slug"
                  required
                  labelCol={{span: 24}}
                >
                  <InputGlobal
                    name="slug"
                    placeholder="Nhập slug"
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
                  label="Địa chỉ"
                  name="address"
                  required
                  labelCol={{span: 24}}
                >
                  <TextAreaGlobal
                    name="address"
                    placeholder="Nhập địa chỉ"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="Điện thoại liên hệ"
                  name="hotline"
                  required
                  labelCol={{span: 24}}
                >
                  <InputGlobal
                    name="hotline"
                    placeholder="Nhập số điện thoại liên hệ"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormItem>
                <FormItem
                  label="Chọn danh mục"
                  name="categoryId"
                  required
                  labelCol={{span: 24}}
                >
                  <Select
                    options={listCategories}
                    onChange={(value) => setFieldValue("categoryId", value)}
                    placeholder="Chọn danh mục"
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
                <FormItem
                  label="Thời gian làm việc"
                  name="start_time"
                  required
                  labelCol={{span: 24}}
                >
                  <TimePicker.RangePicker
                    format={"HH:mm"}
                    className="w-full"
                    placeholder={["Thời gian bắt đầu", "Thời gian kết thúc"]}
                    onChange={(value) => {
                      if (value?.[0] && value?.[1]) {
                        setFieldValue("start_time", value[0].format("HH:mm"));
                        setFieldValue("end_time", value[1].format("HH:mm"));
                      }
                    }}
                  />
                </FormItem>
                <FormItem
                  label="Hình thức đặt khám"
                  name="booking_forms"
                  required
                  labelCol={{span: 24}}
                >
                  <Select
                    mode="multiple"
                    allowClear
                    options={listMedicalBookingForms}
                    placeholder="Chọn hình thức đặt khám"
                    onChange={(value) => {
                      setFieldValue("booking_forms", value);
                    }}
                  />
                </FormItem>
                <FormItem
                  label="Loại bệnh viện"
                  name="types"
                  required
                  labelCol={{span: 24}}
                >
                  <Select
                    mode="multiple"
                    allowClear
                    options={OPTIONS.LIST_HOSPITAL_TYPE}
                    placeholder="Chọn loại bệnh viện"
                    onChange={(value) => {
                      setFieldValue("types", value);
                    }}
                  />
                </FormItem>
              </Col>
            </Row>
            <FooterModalButton
              className="bg-white"
              textOk="Tạo bệnh viện"
              onOk={handleSubmit}
              isLoading={isSubmitting}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
}
