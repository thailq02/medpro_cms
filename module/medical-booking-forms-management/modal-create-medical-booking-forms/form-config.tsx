"use client";
import {NonNullableFields} from "@/apiRequest/common";
import REGEX_VALIDATION from "@/utils/constants/regexValidation";
import * as Yup from "yup";
import {Schema} from "yup";

export interface ICreateMedicalBookingForms {
  name: string;
  slug?: string;
  image?: string;
}

export type RequiredMedicalBookingForms = Required<
  NonNullableFields<ICreateMedicalBookingForms>
>;

export function getValidationCreateMedicalBookingFormsSchema(): Schema<ICreateMedicalBookingForms> {
  return Yup.object().shape({
    name: REGEX_VALIDATION.REGEX_STRING_NO_SPACE,
    slug: Yup.string().trim(),
    image: Yup.string(),
  });
}
