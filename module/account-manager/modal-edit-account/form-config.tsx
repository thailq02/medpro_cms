"use client";
import * as Yup from "yup";
import {Schema} from "yup";
import REGEX_VALIDATION from "@/utils/constants/regexValidation";

export interface IUpdateAccountForm {
  name: string;
  date_of_birth: string;
  gender: number;
  address: string;
  phone_number: string;
  position?: number;
  avatar?: string;
  role?: number;
  username?: string;
  verify?: number;
}

export function getValidationEditAccountSchema(): Schema<IUpdateAccountForm> {
  return Yup.object().shape({
    name: REGEX_VALIDATION.REGEX_STRING,
    date_of_birth: REGEX_VALIDATION.REGEX_DATE_OF_BIRTH,
    gender: REGEX_VALIDATION.REGEX_GENDER,
    address: REGEX_VALIDATION.REGEX_STRING_NO_SPACE,
    avatar: Yup.string().trim(),
    phone_number: REGEX_VALIDATION.REGEX_NUMBER_PHONE_VN.required(
      "Không được để trống",
    ),
    position: Yup.number().required("Không được để trống"),
    role: Yup.number(),
    username: REGEX_VALIDATION.REGEX_USERNAME,
    verify: Yup.number(),
  });
}
