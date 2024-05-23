"use client";
import REGEX_VALIDATION from "@/utils/constants/regexValidation";
import * as Yup from "yup";
import {Schema} from "yup";

export interface IEditSpecialtyForm {
  hospital_id: string;
  name: string;
  slug?: string;
  description: string;
}

export function getValidationEditSpecialtySchema(): Schema<IEditSpecialtyForm> {
  return Yup.object().shape({
    name: REGEX_VALIDATION.REGEX_STRING_NO_SPACE,
    description: REGEX_VALIDATION.REGEX_STRING_NO_SPACE,
    hospital_id: Yup.string().trim().required("Bệnh viện không được để trống"),
    slug: REGEX_VALIDATION.REGEX_SLUG,
  });
}
