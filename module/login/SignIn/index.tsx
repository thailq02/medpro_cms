"use client";
import ApiAuth from "@/apiRequest/ApiAuth";
import ApiUser from "@/apiRequest/ApiUser";
import {ButtonSubmit} from "@/components/ButtonSubmit";
import FormItem from "@/components/FormItem";
import Config from "@/config";
import {
  IDataLoginRes,
  ILoginForm,
  getValidationLoginSchema,
} from "@/module/login/SignIn/form-config";
import {loginUser} from "@/redux/slices/UserSlice";
import {useMutation} from "@tanstack/react-query";
import {Form, Image, Input, Row} from "antd";
import {Formik} from "formik";
import {jwtDecode} from "jwt-decode";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import "./index.scss";

interface SignInProps {
  changeTab: (tab: string) => void;
}

export default function SignIn({changeTab}: SignInProps): JSX.Element {
  const dispatch = useDispatch();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: ApiAuth.login,
  });

  const handleLogin = (
    value: ILoginForm,
    {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void},
  ): void => {
    loginMutation.mutate(
      {email: value.email, password: value.password},
      {
        onSuccess: async (data: IDataLoginRes) => {
          const {access_token, refresh_token} = data.payload.data;
          const decoded = jwtDecode(access_token);
          const expiredAt = decoded.exp;
          const [_, user] = await Promise.all([
            ApiAuth.auth({
              access_token,
              refresh_token,
              expiresAt: expiredAt as number,
            }),
            ApiUser.getMe(access_token),
          ]);
          dispatch(
            loginUser({
              ...data.payload.data,
              expiresAt: expiredAt as number,
              user: user.payload.data,
            }),
          );
          setSubmitting(false);
          router.push(Config.PATHNAME.HOME);
          router.refresh();
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
      validateOnBlur
      validationSchema={getValidationLoginSchema()}
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
                className="h-[40px]"
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
                className="h-[40px]"
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
