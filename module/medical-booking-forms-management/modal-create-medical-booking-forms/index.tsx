"use client";
import React, {useState} from "react";
import {Formik, FormikHelpers} from "formik";
import {Col, Form, Row} from "antd";
import FormItem from "@/components/FormItem";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";
import {useCreateMedicalBookingForms} from "@/utils/hooks/medical-booking-forms";
import {InputGlobal} from "@/components/InputGlobal";
import {
  ICreateMedicalBookingForms,
  RequiredMedicalBookingForms,
  getValidationCreateMedicalBookingFormsSchema,
} from "@/module/medical-booking-forms-management/modal-create-medical-booking-forms/form-config";
import {useAppDispatch} from "@/redux/store";
import {closeModal} from "@/redux/slices/ModalSlice";
import {autoSlugify} from "@/utils/constants/checkSlugify";
import UploadImageGlobal from "@/components/UploadGlobal";
import ApiUploadImage from "@/apiRequest/ApiUploadImage";

export default function ContentModalCreateMedicalBookingForms({
  refetch,
}: {
  refetch: () => void;
}) {
  const dispatch = useAppDispatch();
  const {mutate: CreateMedicalBookingForms} = useCreateMedicalBookingForms();

  const initialValues = {
    name: "",
    slug: "",
    image: "",
  };

  const handleCreateMedicalBookingForms = async (
    _values: ICreateMedicalBookingForms,
    {setSubmitting}: FormikHelpers<RequiredMedicalBookingForms>,
  ) => {
    const formData = new FormData();
    let values = _values;
    const data = Boolean(values.slug)
      ? values
      : {
          ...values,
          slug: autoSlugify(values.name),
        };
    if (values?.image && typeof values.image !== "string") {
      formData.append("image", values.image);
      const imageUrl = await ApiUploadImage.uploadImage(formData);
      values = {
        ...data,
        image: imageUrl.payload.data[0].url,
      };
    }
    CreateMedicalBookingForms(
      values as ICreateMedicalBookingForms & {slug: string},
      {
        onSuccess: () => {
          dispatch(closeModal());
          refetch();
        },
        onError: () => setSubmitting(false),
      },
    );
  };
  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      validationSchema={getValidationCreateMedicalBookingFormsSchema()}
      onSubmit={handleCreateMedicalBookingForms}
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
                <div className="mb-5">
                  <UploadImageGlobal
                    url={initialValues.image}
                    onChange={(file) => setFieldValue("image", file)}
                  />
                </div>
                <FormItem
                  label="Tên danh mục"
                  name="name"
                  required
                  labelCol={{span: 24}}
                >
                  <InputGlobal
                    name="name"
                    placeholder="Nhập tên danh mục"
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
              </Col>
            </Row>
            <FooterModalButton
              textOk="Tạo hình thức đặt khám"
              onOk={handleSubmit}
              isLoading={isSubmitting}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
}
