"use client";
import React, {useMemo} from "react";
import {Formik, FormikHelpers} from "formik";
import {Col, DatePicker, Form, Input, Row, Select} from "antd";
import FormItem from "@/components/FormItem";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";
import {
  ICreateAccountForm,
  getValidationCreateAccountSchema,
} from "@/module/account-manager/modal-create-account/form-config";
import {InputGlobal} from "@/components/InputGlobal";
import {useCreateAccount} from "@/utils/hooks/auth";
import {closeModal} from "@/redux/slices/ModalSlice";
import {useQueryClient} from "@tanstack/react-query";
import QUERY_KEY from "@/config/QUERY_KEY";
import {useAppDispatch} from "@/redux/store";
import {OPTIONS} from "@/utils/constants/selectList";
import dayjs from "dayjs";

export default function ContentModalCreateAccount() {
  const {mutate: CreateAccount} = useCreateAccount();
  const queryClient = useQueryClient();
  const dispath = useAppDispatch();
  const initialValues = useMemo(() => {
    return {
      name: "",
      email: "",
      password: "",
      date_of_birth: "",
      gender: 0,
    };
  }, []);

  const handleCreateAccount = (
    values: ICreateAccountForm,
    {setSubmitting}: FormikHelpers<ICreateAccountForm>,
  ) => {
    const value = {...values, confirm_password: values.password};
    CreateAccount(value, {
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: [QUERY_KEY.GET_FULL_USER],
        });
        dispath(closeModal());
      },
      onError: () => setSubmitting(false),
    });
  };
  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      validationSchema={getValidationCreateAccountSchema()}
      onSubmit={handleCreateAccount}
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
                  label="Họ và tên"
                  name="name"
                  required
                  labelCol={{span: 24}}
                >
                  <InputGlobal
                    name="name"
                    placeholder="Nhập tài khoản"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormItem>
                <FormItem
                  label="Email"
                  name="email"
                  required
                  labelCol={{span: 24}}
                >
                  <InputGlobal
                    name="email"
                    placeholder="Nhập tài khoản"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormItem>
                <FormItem
                  label="Mật khẩu"
                  name="password"
                  required
                  labelCol={{span: 24}}
                >
                  <Input.Password
                    name="password"
                    placeholder="Nhập mật khẩu"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormItem>
                <FormItem
                  label="Ngày sinh"
                  name="date_of_birth"
                  required
                  labelCol={{span: 24}}
                >
                  <DatePicker
                    format={"DD/MM/YYYY"}
                    className="w-full"
                    onChange={(e) => {
                      const date = new Date(e.toDate()).toISOString();
                      setFieldValue("date_of_birth", date);
                    }}
                    disabledDate={(e) => e > dayjs()}
                  />
                </FormItem>
                <FormItem
                  label="Giới tính"
                  name="gender"
                  required
                  labelCol={{span: 24}}
                >
                  <Select options={OPTIONS.LIST_GENDER} />
                </FormItem>
              </Col>
            </Row>
            <FooterModalButton
              textOk="Tạo tài khoản"
              onOk={handleSubmit}
              isLoading={isSubmitting}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
}
