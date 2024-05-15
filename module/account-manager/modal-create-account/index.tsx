import React from "react";
import {GenderType} from "@/types";
import {Formik} from "formik";
import {Col, DatePicker, Form, Input, Row, Select} from "antd";
import FormItem from "@/components/FormItem";
import type {BaseOptionType, DefaultOptionType} from "rc-select/lib/Select";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";

const listGender: (BaseOptionType | DefaultOptionType)[] = [
  {
    value: GenderType.MALE,
    label: <span>Nam</span>,
  },
  {
    value: GenderType.FEMALE,
    label: <span>Nữ</span>,
  },
];

export default function ContentModalCreateAccount() {
  const handleLogin = () => {
    //
  };
  return (
    <Formik
      initialValues={{email: "", password: ""}}
      validateOnChange={false}
      validateOnBlur
      // validationSchema={getValidationLoginSchema()}
      onSubmit={handleLogin}
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
                  label="Họ và tên"
                  name="name"
                  required
                  labelCol={{span: 24}}
                >
                  <Input
                    name="email"
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
                  <Input
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
                  <DatePicker format={"DD/MM/YYYY"} className="w-full" />
                </FormItem>
                <FormItem
                  label="Giới tính"
                  name="gender"
                  required
                  labelCol={{span: 24}}
                >
                  <Select options={listGender} />
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
