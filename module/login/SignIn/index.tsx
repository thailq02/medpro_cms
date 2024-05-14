"use client";
import "./index.scss";
import React from "react";
import {Formik} from "formik";
import {Form, Image, Input, Row} from "antd";
import {ButtonSubmit} from "@/components/ButtonSubmit";
import {useDispatch} from "react-redux";
import {loginUser} from "@/redux/slices/UserSlice";
import ApiUser from "@/apiRequest/ApiUser";
import {useMutation} from "@tanstack/react-query";
import {
  IDataLoginRes,
  ILoginForm,
  getValidationLoginSchema,
} from "@/module/login/SignIn/form-config";
import {useRouter} from "next/navigation";
import FormItem from "@/components/FormItem";
import Config from "@/config";

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
        onSuccess: (data: IDataLoginRes) => {
          dispatch(loginUser({...data.payload.data}));
          router.push(Config.PATHNAME.HOME);
          setSubmitting(false);
        },
        onError: () => {
          setSubmitting(false);
        },
      },
    );
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
            <FormItem
              label="Tài khoản"
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
