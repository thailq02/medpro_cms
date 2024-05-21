"use client";
import React from "react";
import {
  GenderType,
  IAccountRole,
  IModalProps,
  PositionType,
  VerifyStatus,
} from "@/types";
import {Formik, FormikHelpers} from "formik";
import {Col, DatePicker, Form, Input, Row, Select} from "antd";
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

export default function ContentModalEditAccount(props: IModalProps) {
  const usernameSelect = props.idSelect;
  const {data} = useQueryGetUserByUsername(usernameSelect);
  const dispatch = useAppDispatch();
  const {mutate: UpdateAccount} = useUpdateAccount();
  const user = data?.payload?.data;
  const initialValues = React.useMemo(() => {
    return {
      name: user?.name || "",
      email: user?.email,
      date_of_birth: user?.date_of_birth || "",
      gender: user?.gender || GenderType.MALE,
      username: user?.username || "",
      phone_number: user?.phone_number || "",
      position: user?.position || PositionType.NONE,
      role: user?.role || IAccountRole.USER,
      verify: user?.verify || VerifyStatus.UNVERIFIED,
      address: user?.address || "",
    };
  }, [data]);
  const handleEditAccount = (
    values: IUpdateAccountForm,
    {setSubmitting}: FormikHelpers<IUpdateAccountForm>,
  ) => {
    UpdateAccount(
      {username: usernameSelect as string, body: values},
      {
        onSuccess: () => {
          if (props.refetch) {
            props.refetch();
          }
          dispatch(closeModal());
        },
        onError: () => setSubmitting(false),
      },
    );
  };
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
          <Form onFinish={handleSubmit} labelAlign="left">
            <Row gutter={24}>
              <Col span={12}>
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
                    value={values.name}
                  />
                </FormItem>
                <FormItem label="Email" name="email" labelCol={{span: 24}}>
                  <InputGlobal
                    name="email"
                    placeholder="Nhập email"
                    value={user?.email}
                    disabled
                  />
                </FormItem>
                <FormItem label="Địa chỉ" name="address" labelCol={{span: 24}}>
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
                  labelCol={{span: 24}}
                >
                  <DatePicker
                    format={"DD/MM/YYYY"}
                    className="w-full"
                    value={dayjs(values.date_of_birth?.toString())}
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
                  labelCol={{span: 24}}
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
                  labelCol={{span: 24}}
                >
                  <InputGlobal
                    name="phone_number"
                    placeholder="Nhập số điện thoại"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone_number}
                  />
                </FormItem>
                <FormItem label="Vị trí " name="position" labelCol={{span: 24}}>
                  <Select
                    options={OPTIONS.LIST_POSITION}
                    value={values.position}
                    onChange={(e) => setFieldValue("position", e)}
                  />
                </FormItem>
                <FormItem label="Chức vụ" name="role" labelCol={{span: 24}}>
                  <Select
                    options={OPTIONS.LIST_ROLE}
                    value={values.role}
                    onChange={(e) => setFieldValue("role", e)}
                  />
                </FormItem>
                <FormItem
                  label="Trạng thái"
                  name="verify"
                  labelCol={{span: 24}}
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
