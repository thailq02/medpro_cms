"use client";
import React, {useMemo} from "react";
import REGEX_VALIDATION from "@/utils/constants/regexValidation";
import FormItem from "@/components/FormItem";
import * as Yup from "yup";
import {useRouter} from "next/navigation";
import {useAppDispatch} from "@/redux/store";
import {Schema} from "yup";
import {Formik, FormikHelpers} from "formik";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";
import {Col, Form, Input, Row} from "antd";
import {closeModal} from "@/redux/slices/ModalSlice";
import {useChangePassword} from "@/utils/hooks/auth";

interface IChangePasswordForm {
   old_password: string;
   new_password: string;
   confirm_new_password: string;
}

function getValidationChangePasswordSchema(): Schema<IChangePasswordForm> {
   return Yup.object().shape({
      old_password: REGEX_VALIDATION.REGEX_PASSWORD,
      new_password: REGEX_VALIDATION.REGEX_PASSWORD,
      confirm_new_password: REGEX_VALIDATION.REGEX_PASSWORD.oneOf(
         [Yup.ref("new_password"), ""],
         "Mật khẩu mới không khớp",
      ),
   });
}

export default function ContentModalChangePassword() {
   const dispatch = useAppDispatch();
   const {mutate: ChangePasswordMutation} = useChangePassword();
   const initialValues = useMemo(() => {
      return {
         old_password: "",
         new_password: "",
         confirm_new_password: "",
      };
   }, []);

   const handleChangePassword = (
      values: IChangePasswordForm,
      {setSubmitting}: FormikHelpers<IChangePasswordForm>,
   ) => {
      ChangePasswordMutation(values, {
         onSuccess: () => {
            setSubmitting(false);
            dispatch(closeModal());
         },
         onError: () => setSubmitting(false),
      });
   };

   return (
      <Formik
         initialValues={initialValues}
         validateOnBlur
         validationSchema={getValidationChangePasswordSchema()}
         onSubmit={handleChangePassword}
      >
         {({
            isSubmitting,
            handleSubmit,
            handleChange,
            handleBlur,
         }): JSX.Element => (
            <div className="modal-form-custom">
               <Form onFinish={handleSubmit} labelAlign="left">
                  <Row gutter={24}>
                     <Col span={24}>
                        <FormItem
                           label="Mật khẩu cũ"
                           name="old_password"
                           required
                           labelCol={{span: 24}}
                        >
                           <Input.Password
                              name="old_password"
                              className="h-[40px]"
                              placeholder="Nhập mật khẩu cũ"
                              onChange={handleChange}
                              onBlur={handleBlur}
                           />
                        </FormItem>
                        <FormItem
                           label="Mật khẩu mới"
                           name="new_password"
                           required
                           labelCol={{span: 24}}
                        >
                           <Input.Password
                              name="new_password"
                              className="h-[40px]"
                              placeholder="Nhập mật khẩu mới"
                              onChange={handleChange}
                              onBlur={handleBlur}
                           />
                        </FormItem>
                        <FormItem
                           label="Nhập lại mật khẩu mới"
                           name="confirm_new_password"
                           required
                           labelCol={{span: 24}}
                        >
                           <Input.Password
                              name="confirm_new_password"
                              className="h-[40px]"
                              placeholder="Nhập lại mật khẩu mới"
                              onChange={handleChange}
                              onBlur={handleBlur}
                           />
                        </FormItem>
                     </Col>
                  </Row>
                  <FooterModalButton
                     textOk="Đổi mật khẩu"
                     onOk={handleSubmit}
                     isLoading={isSubmitting}
                  />
               </Form>
            </div>
         )}
      </Formik>
   );
}
