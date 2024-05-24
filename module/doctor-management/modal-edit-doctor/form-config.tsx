"use client";
import * as Yup from "yup";
import {Schema} from "yup";
import REGEX_VALIDATION from "@/utils/constants/regexValidation";

export interface IEditDoctorForm {
  hospital_id: string;
  specialty_id: string;
  description: string;
  therapy: string;
  price: number;
  session: string;
}

export function getValidationEditDoctorSchema(): Schema<IEditDoctorForm> {
  return Yup.object().shape({
    hospital_id: Yup.string().required("Vui lòng chọn bệnh viện"),
    specialty_id: Yup.string().required("Vui lòng chọn chuyên khoa"),
    description: REGEX_VALIDATION.REGEX_STRING_NO_SPACE,
    therapy: REGEX_VALIDATION.REGEX_STRING_NO_SPACE,
    price: REGEX_VALIDATION.REGEX_NUMBER,
    session: REGEX_VALIDATION.REGEX_STRING_NO_SPACE,
  });
}
