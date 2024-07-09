"use client";
import REGEX_VALIDATION, {
  REGEX_NO_SPACE,
} from "@/utils/constants/regexValidation";
import * as Yup from "yup";
import {Schema} from "yup";

export interface ICreateHospital {
  categoryId: string;
  name: string;
  slug?: string;
  description: string;
  session: string;
  hotline: string;
  address: string;
  avatar?: string;
  banner?: string;
  images?: string[];
  start_time: string;
  end_time: string;
  types: number[];
  booking_forms: string[];
  description_detail?: string | null;
}

export type RequiredCreateHospitalForm = Required<ICreateHospital>;

export function getValidationCreateHospitalSchema(): Schema<ICreateHospital> {
  return Yup.object().shape({
    categoryId: Yup.string().required("Vui lòng chọn danh mục"),
    name: REGEX_VALIDATION.REGEX_STRING_NO_SPACE,
    description: Yup.string()
      .trim()
      .matches(REGEX_NO_SPACE, "Không được chỉ chứa khoảng trắng")
      .required("Không được để trống")
      .max(500, "Không vượt quá 500 kí tự"),
    hotline: REGEX_VALIDATION.REGEX_NUMBER_PHONE_VN.required(
      "Vui lòng nhập số điện thoại",
    ),
    start_time: Yup.string()
      .trim()
      .required("Vui lòng nhập thời gian làm việc"),
    end_time: Yup.string().trim().required("Vui lòng nhập thời gian làm việc"),
    slug: REGEX_VALIDATION.REGEX_SLUG,
    session: Yup.string().trim().required("Vui lòng nhập lịch làm việc"),
    address: REGEX_VALIDATION.REGEX_STRING_NO_SPACE,
    avatar: Yup.string().trim(),
    banner: Yup.string().trim(),
    types: Yup.array()
      .of(Yup.number().required("Vui lòng chọn loại bệnh viện"))
      .required("Vui lòng chọn loại bệnh viện"),
    booking_forms: Yup.array()
      .of(Yup.string().trim().required("Vui lòng chọn hình thức đặt lịch"))
      .required("Vui lòng chọn hình thức đặt lịch"),
    description_detail: Yup.string().trim().nullable(),
  });
}
