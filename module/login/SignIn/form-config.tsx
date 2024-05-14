import {ILoginResponse} from "@/apiRequest/ApiUser";
import * as Yup from "yup";
import {Schema} from "yup";

export interface ILoginForm {
  email: string;
  password: string;
}
export interface IDataLoginRes {
  status: number;
  payload: ILoginResponse;
}
export function getValidationLoginSchema(): Schema<ILoginForm> {
  return Yup.object().shape({
    email: Yup.string()
      .email("Email không đúng định dạng")
      .max(255, "Email không được vuợt quá 255 kí tự")
      .required("Email không được để trống"),
    password: Yup.string()
      .min(6, "Mật khẩu phải từ 6 kí tự trở lên")
      .max(55, "Mật khẩu không quá 55 kí tự")
      .required("Mật khẩu không được để trống"),
  });
}
