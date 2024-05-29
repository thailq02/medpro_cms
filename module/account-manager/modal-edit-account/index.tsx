"use client";
import React, {useEffect, useState} from "react";
import {GenderType, IModalProps} from "@/types";
import {Formik, FormikHelpers} from "formik";
import {Col, DatePicker, Form, Image, Row, Select, Upload} from "antd";
import FormItem from "@/components/FormItem";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";
import {useQueryGetUserByUsername, useUpdateAccount} from "@/utils/hooks/auth";
import {InputGlobal, TextAreaGlobal} from "@/components/InputGlobal";
import dayjs from "dayjs";
import {OPTIONS} from "@/utils/constants/selectList";
import {
   IUpdateAccountForm,
   getValidationEditAccountSchema,
} from "@/module/account-manager/modal-edit-account/form-config";
import {useAppDispatch} from "@/redux/store";
import {closeModal} from "@/redux/slices/ModalSlice";
import {useRouter} from "next/navigation";
import "./index.scss";
import {CameraFilled, LoadingOutlined} from "@ant-design/icons";
import {RcFile} from "antd/es/upload";
import {IMAGE_FORMATS_ACCEPTED} from "@/utils/constants/regexValidation";
import ApiUploadImage from "@/apiRequest/ApiUploadImage";
import {getBase64} from "@/components/UploadGlobal";
import {useQueryClient} from "@tanstack/react-query";
import QUERY_KEY from "@/config/QUERY_KEY";

export default function ContentModalEditAccount(props: IModalProps) {
   const usernameSelect = props.idSelect;
   const [imageUrl, setImageUrl] = useState<string | undefined>("");
   const [loading, setLoading] = useState<boolean>(false);
   const router = useRouter();
   const dispatch = useAppDispatch();
   const queryClient = useQueryClient();
   const {data} = useQueryGetUserByUsername(usernameSelect);
   const {mutate: UpdateAccount} = useUpdateAccount();
   const user = data?.payload?.data;
   const initialValues = React.useMemo(() => {
      return {
         name: user?.name || "",
         email: user?.email,
         date_of_birth: user?.date_of_birth || "",
         gender: user?.gender || GenderType.MALE,
         username: user?.username,
         phone_number: user?.phone_number || "",
         position: user?.position,
         role: user?.role,
         verify: user?.verify,
         address: user?.address || "",
      };
   }, [data]);

   useEffect(() => {
      if (user) {
         setImageUrl(user.avatar);
      }
   }, [user?.avatar]);

   const handleEditAccount = async (
      _values: IUpdateAccountForm,
      {setSubmitting}: FormikHelpers<IUpdateAccountForm>,
   ) => {
      const formData = new FormData();
      let values = _values;
      if (values?.avatar && typeof values.avatar !== "string") {
         formData.append("image", values.avatar);
         const imageUrl = await ApiUploadImage.uploadImage(formData);
         values = {
            ...values,
            avatar: imageUrl.payload.data[0].url,
         };
      }
      UpdateAccount(
         {username: usernameSelect as string, body: values},
         {
            onSuccess: () => {
               queryClient.refetchQueries({
                  queryKey: [QUERY_KEY.GET_USER_BY_USERNAME, usernameSelect],
               });
               if (props.refetch) {
                  props.refetch();
               }
               dispatch(closeModal());
               router.refresh();
            },
            onError: () => setSubmitting(false),
         },
      );
   };
   if (!data) return;
   return (
      <Formik
         initialValues={initialValues}
         validateOnBlur
         enableReinitialize
         validationSchema={getValidationEditAccountSchema()}
         onSubmit={handleEditAccount}
      >
         {({
            isSubmitting,
            handleSubmit,
            handleChange,
            handleBlur,
            setFieldValue,
            values,
         }): JSX.Element => (
            <div className="modal-form-custom">
               <div className="avatar-container mb-5">
                  <Image
                     width={150}
                     height={150}
                     src={imageUrl || "/img/avatar/avatar.jpg"}
                     style={{borderRadius: "50%", objectFit: "cover"}}
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
                  <Row gutter={24}>
                     <Col span={12}>
                        <FormItem
                           label="Họ và tên"
                           name="name"
                           required
                           labelCol={{span: 6}}
                        >
                           <InputGlobal
                              name="name"
                              placeholder="Nhập tài khoản"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.name}
                           />
                        </FormItem>
                        <FormItem
                           label="Email"
                           name="email"
                           labelCol={{span: 6}}
                        >
                           <InputGlobal
                              name="email"
                              placeholder="Nhập email"
                              value={user?.email}
                              disabled
                           />
                        </FormItem>
                        <FormItem
                           label="Địa chỉ"
                           name="address"
                           labelCol={{span: 6}}
                        >
                           <TextAreaGlobal
                              name="address"
                              placeholder="Nhập địa chỉ"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.address}
                           />
                        </FormItem>
                        <FormItem
                           label="Ngày sinh"
                           name="date_of_birth"
                           required
                           labelCol={{span: 6}}
                        >
                           <DatePicker
                              format={"DD/MM/YYYY"}
                              className="w-full"
                              value={dayjs(values.date_of_birth?.toString())}
                              onChange={(e) => {
                                 const date = new Date(
                                    e.toDate(),
                                 ).toISOString();
                                 setFieldValue("date_of_birth", date);
                              }}
                              disabledDate={(e) => e > dayjs()}
                           />
                        </FormItem>
                        <FormItem
                           label="Giới tính"
                           name="gender"
                           required
                           labelCol={{span: 6}}
                        >
                           <Select
                              options={OPTIONS.LIST_GENDER}
                              value={values.gender}
                              onChange={(e) => setFieldValue("gender", e)}
                           />
                        </FormItem>
                     </Col>
                     <Col span={12}>
                        <FormItem
                           label="Username"
                           name="username"
                           labelCol={{span: 6}}
                        >
                           <InputGlobal
                              name="username"
                              placeholder="Nhập username"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.username}
                           />
                        </FormItem>
                        <FormItem
                           label="Số điện thoại"
                           name="phone_number"
                           labelCol={{span: 6}}
                        >
                           <InputGlobal
                              name="phone_number"
                              placeholder="Nhập số điện thoại"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.phone_number}
                           />
                        </FormItem>
                        <FormItem
                           label="Vị trí"
                           name="position"
                           labelCol={{span: 6}}
                        >
                           <Select
                              options={OPTIONS.LIST_POSITION}
                              value={values.position}
                              onChange={(e) => setFieldValue("position", e)}
                           />
                        </FormItem>
                        <FormItem
                           label="Vai trò"
                           name="role"
                           labelCol={{span: 6}}
                        >
                           <Select
                              options={OPTIONS.LIST_ROLE}
                              value={values.role}
                              onChange={(e) => setFieldValue("role", e)}
                           />
                        </FormItem>
                        <FormItem
                           label="Trạng thái"
                           name="verify"
                           labelCol={{span: 6}}
                        >
                           <Select
                              options={OPTIONS.LIST_VERIFY_STATUS}
                              value={values.verify}
                              onChange={(e) => setFieldValue("verify", e)}
                           />
                        </FormItem>
                     </Col>
                  </Row>
                  <FooterModalButton
                     textOk="Sửa tài khoản"
                     onOk={handleSubmit}
                     isLoading={isSubmitting}
                  />
               </Form>
            </div>
         )}
      </Formik>
   );
}
