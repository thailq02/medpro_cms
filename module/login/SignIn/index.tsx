"use client";

import "./index.scss";
import React from "react";
import {Formik} from "formik";
import {Form, Image, Input, Row} from "antd";
import {ButtonSubmit} from "@/components/ButtonSubmit";

interface SignInProps {
  changeTab: (tab: string) => void;
}

export default function SignIn({changeTab}: SignInProps): JSX.Element {
  const handleLogin = (value: any) => {
    console.log(value);
  };
  return (
    <Formik initialValues={{email: "", password: ""}} onSubmit={handleLogin}>
      {({
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
      }): JSX.Element => (
        <div className="container-sign-in">
          <Form className="form-sign-in">
            <div className="header-wrapper">
              <Image
                className="login-image"
                src="img/logo.png"
                preview={false}
              />
              <h1 className="login-text">Đăng nhập</h1>
            </div>
            <Form.Item
              label="Tài khoản"
              name="email"
              required
              labelCol={{span: 24}}
            >
              <Input
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Nhập tài khoản"
              />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              required
              labelCol={{span: 24}}
            >
              <Input.Password
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Nhập mật khẩu"
              />
            </Form.Item>
            <Row
              role="button"
              tabIndex={0}
              className="forgot-pass"
              onClick={(): void => changeTab("forgotPassword")}
            >
              Quên mật khẩu?
            </Row>

            <ButtonSubmit
              label="Đăng nhập"
              isSubmitting={isSubmitting}
              classRow="pt-3"
            />
          </Form>
        </div>
      )}
    </Formik>
  );
}
