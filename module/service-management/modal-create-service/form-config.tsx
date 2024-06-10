"use client";
import REGEX_VALIDATION, {
  REGEX_NO_SPACE,
} from "@/utils/constants/regexValidation";
import * as Yup from "yup";
import {Schema} from "yup";

export interface ICreateServiceForm {
  hospital_id: string;
  specialty_id?: string;
  name: string;
  description: string;
  note?: string;
  price: number;
  session: string;
}

export function getValidationCreateServiceSchema(): Schema<ICreateServiceForm> {
  return Yup.object().shape({
    name: REGEX_VALIDATION.REGEX_STRING_NO_SPACE,
    description: REGEX_VALIDATION.REGEX_STRING_NO_SPACE,
    note: Yup.string()
      .trim()
      .matches(REGEX_NO_SPACE, "Không được chỉ chứa khoảng trắng")
      .max(255, "Không vượt quá 255 kí tự"),
    price: REGEX_VALIDATION.REGEX_NUMBER,
    session: REGEX_VALIDATION.REGEX_STRING_NO_SPACE,
    hospital_id: Yup.string().trim().required("Bệnh viện không được để trống"),
    specialty_id: Yup.string().trim(),
  });
}
