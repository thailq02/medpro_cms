"use client";
import REGEX_VALIDATION from "@/utils/constants/regexValidation";
import * as Yup from "yup";
import {Schema} from "yup";

export interface ICreateAccountForm {
  name: string;
  email: string;
  password: string;
  date_of_birth: string;
  gender: number;
}

export function getValidationCreateAccountSchema(): Schema<ICreateAccountForm> {
  return Yup.object().shape({
    name: REGEX_VALIDATION.REGEX_STRING,
    email: REGEX_VALIDATION.REGEX_EMAIL,
    password: REGEX_VALIDATION.REGEX_PASSWORD,
    date_of_birth: REGEX_VALIDATION.REGEX_DATE_OF_BIRTH,
    gender: REGEX_VALIDATION.REGEX_GENDER,
  });
}
