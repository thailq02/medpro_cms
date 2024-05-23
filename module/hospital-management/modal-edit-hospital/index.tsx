"use client";
import React, {useMemo} from "react";
import {Formik, FormikHelpers} from "formik";
import {Col, Form, Image, Row, Select, Tabs, TimePicker} from "antd";
import FormItem from "@/components/FormItem";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";
import {IModalProps} from "@/types";
import {
  useQueryGetHospitalById,
  useUpdateHospital,
} from "@/utils/hooks/hospital";
import {InputGlobal, TextAreaGlobal} from "@/components/InputGlobal";
import {OPTIONS} from "@/utils/constants/selectList";
import dayjs from "dayjs";
import {
  IEditHospital,
  getValidationEditHospitalSchema,
} from "@/module/hospital-management/modal-edit-hospital/form-config";
import {useAppDispatch} from "@/redux/store";
import {closeModal} from "@/redux/slices/ModalSlice";
import {useRouter} from "next/navigation";
import {autoSlugify} from "@/utils/constants/checkSlugify";

interface IEditHospitalProps extends IModalProps {
  listMedicalBookingForms: {
    value?: string;
    label?: string;
  }[];
  listCategories: {
    value?: string;
    label?: JSX.Element;
  }[];
}

export default function ContentModalEditHospital({
  idSelect,
  refetch,
  listMedicalBookingForms,
  listCategories,
}: IEditHospitalProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {data: hospitals} = useQueryGetHospitalById(idSelect as string);
  const {mutate: UpdateHospitalMutation} = useUpdateHospital();
  const initialValues = useMemo(() => {
    const data = hospitals?.payload?.data;
    return {
      categoryId: data?.category?._id || "",
      name: data?.name || "",
      slug: data?.slug || "",
      description: data?.description || "",
      session: data?.session || "",
      hotline: data?.hotline || "",
      address: data?.address || "",
      avatar: data?.avatar || "",
      banner: data?.banner || "",
      images: data?.images || [],
      start_time: data?.start_time || "",
      end_time: data?.end_time || "",
      types: data?.types || [],
      booking_forms: data?.booking_forms?.map((i) => i.id as string) || [],
    };
  }, [hospitals]);
  const handleEditHospital = (
    values: IEditHospital,
    {setSubmitting}: FormikHelpers<any>,
  ) => {
    const data = Boolean(values.slug)
      ? values
      : {
          ...values,
          slug: autoSlugify(values.name),
        };
    UpdateHospitalMutation(
      {id: idSelect as string, data},
      {
        onSuccess: () => {
          dispatch(closeModal());
          refetch && refetch();
          router.refresh();
        },
        onError: () => setSubmitting(false),
      },
    );
  };

  if (!hospitals) return;
  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      validationSchema={getValidationEditHospitalSchema()}
      onSubmit={handleEditHospital}
    >
      {({
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
        values,
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
          <Form onFinish={handleSubmit} labelAlign="left">
            <Tabs
              defaultActiveKey="1"
              className="modal-edit-hospital !h-[400px]"
            >
              <Tabs.TabPane tab="Cập nhật thông tin" key="1">
                <Row gutter={24}>
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
                        value={values.description}
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
                        value={values.address}
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
                        value={values.hotline}
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
                        value={values.categoryId}
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
                        value={values.session}
                      />
                    </FormItem>
                    <FormItem
                      label="Thời gian làm việc"
                      name="timeline"
                      required
                      labelCol={{span: 24}}
                    >
                      <TimePicker.RangePicker
                        format={"HH:mm"}
                        className="w-full"
                        onChange={(value) => {
                          if (value?.[0] && value?.[1]) {
                            setFieldValue(
                              "start_time",
                              value[0].format("HH:mm"),
                            );
                            setFieldValue("end_time", value[1].format("HH:mm"));
                          } else {
                            setFieldValue("start_time", "");
                            setFieldValue("end_time", "");
                          }
                        }}
                        value={
                          values.start_time && values.end_time
                            ? [
                                dayjs(values.start_time.toString(), "HH:mm"),
                                dayjs(values.end_time.toString(), "HH:mm"),
                              ]
                            : undefined
                        }
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
                        value={values?.booking_forms?.map((item) => {
                          return listMedicalBookingForms.find(
                            (i) => i.value === item,
                          );
                        })}
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
                        value={values.types}
                      />
                    </FormItem>
                  </Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Cập nhật ảnh" key="2">
                Chưa làm đến nhé!!
              </Tabs.TabPane>
              <Tabs.TabPane tab="Thông tin bác sĩ của bệnh viện" key="3">
                Chưa làm đến nhé!!
              </Tabs.TabPane>
            </Tabs>
            <FooterModalButton
              textOk="Sửa bệnh viện"
              onOk={handleSubmit}
              isLoading={isSubmitting}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
}
