"use client";
import React from "react";
import {Formik, FormikHelpers} from "formik";
import {Col, Form, Row, Select} from "antd";
import FormItem from "@/components/FormItem";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";
import {useCreateSpecialty} from "@/utils/hooks/specialty";
import {
  ICreateSpecialtyForm,
  getValidationCreateSpecialtySchema,
} from "@/module/specialty-management/modal-create-specialty/form-config";
import {InputGlobal, TextAreaGlobal} from "@/components/InputGlobal";
import {useAppDispatch} from "@/redux/store";
import {closeModal} from "@/redux/slices/ModalSlice";
import {autoSlugify} from "@/utils/constants/checkSlugify";

interface ICreateSpecialtyProps {
  listHospital: {
    value?: string;
    label?: string;
  }[];
  refetch: () => void;
}
export default function ContentModalCreateSpecialty({
  refetch,
  listHospital,
}: ICreateSpecialtyProps) {
  const dispatch = useAppDispatch();
  const {mutate: CreateSpecialtyMutation} = useCreateSpecialty();
  const handleCreateSpecialty = (
    values: ICreateSpecialtyForm,
    {setSubmitting}: FormikHelpers<any>,
  ) => {
    const data = Boolean(values.slug)
      ? {...values}
      : {
          ...values,
          slug: autoSlugify(values.name),
        };
    CreateSpecialtyMutation(data, {
      onSuccess: () => {
        dispatch(closeModal());
        refetch && refetch();
      },
      onError: () => setSubmitting(false),
    });
  };

  const initialValues = {
    name: "",
    hospital_id: "",
    description: "",
    slug: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      validationSchema={getValidationCreateSpecialtySchema()}
      onSubmit={handleCreateSpecialty}
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
                  label="Tên chuyên khoa"
                  name="name"
                  required
                  labelCol={{span: 24}}
                >
                  <InputGlobal
                    name="name"
                    placeholder="Nhập tên chuyên khoa"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormItem>
                <FormItem
                  label="Bệnh viện"
                  name="hospital_id"
                  required
                  labelCol={{span: 24}}
                >
                  <Select
                    allowClear
                    options={listHospital}
                    placeholder="Chọn bệnh viện"
                    onChange={(value) => setFieldValue("hospital_id", value)}
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
                  label="Slug"
                  name="slug"
                  required
                  labelCol={{span: 24}}
                >
                  <TextAreaGlobal
                    name="slug"
                    placeholder="Nhập slug"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormItem>
              </Col>
            </Row>
            <FooterModalButton
              textOk="Tạo chuyên khoa"
              onOk={handleSubmit}
              isLoading={isSubmitting}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
}
