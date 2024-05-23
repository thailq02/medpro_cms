"use client";
import REGEX_VALIDATION from "@/utils/constants/regexValidation";
import * as Yup from "yup";
import {Schema} from "yup";

export interface IEditServiceForm {
  hospital_id: string;
  specialty_id?: string;
  name: string;
  description: string;
  note: string;
  price: number;
  session: string;
}

export function getValidationEditServiceSchema(): Schema<IEditServiceForm> {
  return Yup.object().shape({
    name: REGEX_VALIDATION.REGEX_STRING_NO_SPACE,
    description: REGEX_VALIDATION.REGEX_STRING_NO_SPACE,
    note: REGEX_VALIDATION.REGEX_STRING_NO_SPACE,
    price: REGEX_VALIDATION.REGEX_NUMBER,
    session: REGEX_VALIDATION.REGEX_STRING_NO_SPACE,
    hospital_id: Yup.string().trim().required("Bệnh viện không được để trống"),
    specialty_id: Yup.string().trim(),
  });
}
