"use client";
import React, {useMemo} from "react";
import {Formik, FormikHelpers} from "formik";
import {Col, Form, Row} from "antd";
import FormItem from "@/components/FormItem";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";
import {IModalProps} from "@/types";
import {
  useQueryGetMedicalBookingFormsById,
  useUpdateMedicalBookingForms,
} from "@/utils/hooks/medical-booking-forms";
import {InputGlobal} from "@/components/InputGlobal";
import {
  IEditMedicalBookingForms,
  getValidationEditMedicalBookingFormsSchema,
} from "@/module/medical-booking-forms-management/modal-edit-medical-booking-forms/form-config";
import {RequiredMedicalBookingForms} from "@/module/medical-booking-forms-management/modal-create-medical-booking-forms/form-config";
import {useAppDispatch} from "@/redux/store";
import {closeModal} from "@/redux/slices/ModalSlice";
import {autoSlugify} from "@/utils/constants/checkSlugify";
import UploadImageGlobal from "@/components/UploadGlobal";
import ApiUploadImage from "@/apiRequest/ApiUploadImage";

export default function ContentModalEditMedicalBookingForms(
  props: IModalProps,
) {
  const dispatch = useAppDispatch();
  const {data: medicalBookingForms} = useQueryGetMedicalBookingFormsById(
    props.idSelect,
  );
  const {mutate: UpdateMedicalBookingForms} = useUpdateMedicalBookingForms();

  const initialValues = useMemo(() => {
    return {
      name: medicalBookingForms?.payload?.data.name || "",
      slug: medicalBookingForms?.payload?.data.slug || "",
      image: medicalBookingForms?.payload?.data.image || "",
    };
  }, [medicalBookingForms]);

  const handleEditMedicalBookingForms = async (
    _values: IEditMedicalBookingForms,
    {setSubmitting}: FormikHelpers<RequiredMedicalBookingForms>,
  ) => {
    const formData = new FormData();
    let values = _values;
    if (initialValues?.image === values.image) {
      formData.delete("image");
    }
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
    UpdateMedicalBookingForms(
      {
        id: props.idSelect as string,
        body: values as IEditMedicalBookingForms & {slug: string},
      },
      {
        onSuccess: () => {
          dispatch(closeModal());
          if (props.refetch) {
            props.refetch();
          }
        },
        onError: () => setSubmitting(false),
      },
    );
  };
  if (!medicalBookingForms) return;
  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      validationSchema={getValidationEditMedicalBookingFormsSchema()}
      onSubmit={handleEditMedicalBookingForms}
    >
      {({
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        setFieldValue,
      }): JSX.Element => (
        <div className="modal-form-custom">
          <Form onFinish={handleSubmit} labelAlign="left">
            <Row gutter={24}>
              <Col span={24}>
                <div className="mb-5">
                  <UploadImageGlobal
                    url={values.image}
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
                    value={values.name}
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
                    value={values.slug}
                  />
                </FormItem>
              </Col>
            </Row>
            <FooterModalButton
              textOk="Sửa hình thức đặt khám"
              onOk={handleSubmit}
              isLoading={isSubmitting}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
}
