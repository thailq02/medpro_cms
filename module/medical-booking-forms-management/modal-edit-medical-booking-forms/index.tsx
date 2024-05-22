"use client";
import React, {useMemo, useState} from "react";
import {Formik, FormikHelpers} from "formik";
import {Col, Form, Row, Upload, message} from "antd";
import FormItem from "@/components/FormItem";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import type {GetProp, UploadProps} from "antd";
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
import slugify from "slugify";
import {useAppDispatch} from "@/redux/store";
import {closeModal} from "@/redux/slices/ModalSlice";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

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
      image: medicalBookingForms?.payload?.data.image || "chualamgi",
    };
  }, [medicalBookingForms]);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{border: 0, background: "none"}} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{marginTop: 8}}>Upload</div>
    </button>
  );

  const handleEditMedicalBookingForms = (
    values: IEditMedicalBookingForms,
    {setSubmitting}: FormikHelpers<RequiredMedicalBookingForms>,
  ) => {
    const data = Boolean(values.slug)
      ? values
      : {
          ...values,
          slug: slugify(values.name, {
            lower: true,
            trim: true,
          }),
        };
    UpdateMedicalBookingForms(
      {
        id: props.idSelect as string,
        body: data as IEditMedicalBookingForms & {slug: string},
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
      }): JSX.Element => (
        <div className="modal-form-custom">
          <Form onFinish={handleSubmit} labelAlign="left">
            <Row gutter={24}>
              <Col span={24}>
                <div className="mb-5">
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{width: "100%"}}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
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
