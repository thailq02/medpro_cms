"use client";
import "./index.scss";
import React from "react";
import {Formik} from "formik";
import {Form, Image, Input, Row} from "antd";
import {ButtonSubmit} from "@/components/ButtonSubmit";
import {useDispatch} from "react-redux";
import {loginUser} from "@/redux/slices/UserSlice";
import ApiUser, {ILoginResponse} from "@/apiRequest/ApiUser";
import {useMutation} from "@tanstack/react-query";
import {ILoginForm} from "@/module/login/SignIn/form-config";
import {useRouter} from "next/navigation";
import Config from "config";

interface SignInProps {
  changeTab: (tab: string) => void;
}

export default function SignIn({changeTab}: SignInProps): JSX.Element {
  const dispatch = useDispatch();
  const router = useRouter();
  const loginMutation = useMutation({
    mutationFn: ApiUser.login,
  });
  const handleLogin = (
    value: ILoginForm,
    {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void},
  ): void => {
    loginMutation.mutate(
      {email: value.email, password: value.password},
      {
        onSuccess: (data: {status: number; payload: ILoginResponse}) => {
          dispatch(loginUser({...data.payload}));
          // router.push(Config.PATHNAME.HOME);
          setSubmitting(false);
        },
        onError: () => {
          setSubmitting(false);
        },
      },
    );
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
          <Form className="form-sign-in" onFinish={handleSubmit}>
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
