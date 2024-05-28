"use client";
import React, {useEffect, useMemo, useState} from "react";
import {Formik, FormikHelpers} from "formik";
import {Col, Form, Image, Row, Select, Tabs, TimePicker, Upload} from "antd";
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
import {IMAGE_FORMATS_ACCEPTED} from "@/utils/constants/regexValidation";
import {getBase64} from "@/components/UploadGlobal";
import {RcFile} from "antd/es/upload";
import {CameraFilled, LoadingOutlined} from "@ant-design/icons";
import ApiUploadImage from "@/apiRequest/ApiUploadImage";

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
   const [imageUrl, setImageUrl] = useState<string | undefined>("");
   const [loading, setLoading] = useState<boolean>(false);

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

   useEffect(() => {
      if (hospitals) {
         setImageUrl(hospitals.payload.data.avatar);
      }
   }, [hospitals?.payload.data.avatar]);

   const handleEditHospital = async (
      _values: IEditHospital,
      {setSubmitting}: FormikHelpers<any>,
   ) => {
      const formData = new FormData();
      let values = _values;
      if (initialValues.avatar === values.avatar) {
         formData.delete("avatar");
      }
      const data = Boolean(values.slug)
         ? values
         : {
              ...values,
              slug: autoSlugify(values.name),
           };
      if (values.avatar && typeof values.avatar !== "string") {
         formData.append("image", values.avatar);
         const imageUrl = await ApiUploadImage.uploadImage(formData);
         values = {
            ...data,
            avatar: imageUrl?.payload?.data[0].url,
         };
      }
      UpdateHospitalMutation(
         {id: idSelect as string, data: values},
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
               <div className="avatar-container mb-7">
                  <Image
                     width={300}
                     height={150}
                     src={imageUrl || "/img/avatar/avatar.jpg"}
                     style={{borderRadius: "10%", objectFit: "cover"}}
                     fallback="/img/avatar/avatar.jpg"
                  />
                  <div className="button-update-avatar">
                     <Upload
                        multiple={false}
                        listType="picture-card"
                        name="avatar"
                        accept={IMAGE_FORMATS_ACCEPTED.join(",")}
                        onChange={(image) => {
                           if (image.file.status === "uploading") {
                              setLoading(true);
                              return;
                           }
                           const latestFile =
                              image.fileList[image.fileList.length - 1];
                           if (
                              latestFile &&
                              latestFile.status !== "uploading"
                           ) {
                              image.fileList = [latestFile];
                              getBase64(
                                 latestFile.originFileObj as RcFile,
                                 (url) => {
                                    setLoading(false);
                                    setImageUrl(url);
                                 },
                              );
                              setFieldValue(
                                 "avatar",
                                 latestFile.originFileObj as File,
                              );
                           }
                        }}
                        beforeUpload={() => false}
                        showUploadList={false}
                     >
                        {loading ? (
                           <LoadingOutlined className="icon-update-avatar" />
                        ) : (
                           <CameraFilled className="icon-update-avatar" />
                        )}
                     </Upload>
                  </div>
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
                                    onChange={(value) =>
                                       setFieldValue("categoryId", value)
                                    }
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
                                          setFieldValue(
                                             "end_time",
                                             value[1].format("HH:mm"),
                                          );
                                       } else {
                                          setFieldValue("start_time", "");
                                          setFieldValue("end_time", "");
                                       }
                                    }}
                                    value={
                                       values.start_time && values.end_time
                                          ? [
                                               dayjs(
                                                  values.start_time.toString(),
                                                  "HH:mm",
                                               ),
                                               dayjs(
                                                  values.end_time.toString(),
                                                  "HH:mm",
                                               ),
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
                                    value={values?.booking_forms?.map(
                                       (item) => {
                                          return listMedicalBookingForms.find(
                                             (i) => i.value === item,
                                          );
                                       },
                                    )}
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
