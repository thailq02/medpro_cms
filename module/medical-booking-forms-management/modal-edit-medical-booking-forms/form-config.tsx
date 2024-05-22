"use client";
import {NonNullableFields} from "@/apiRequest/common";
import REGEX_VALIDATION from "@/utils/constants/regexValidation";
import * as Yup from "yup";
import {Schema} from "yup";

export interface IEditMedicalBookingForms {
  name: string;
  slug?: string;
  image?: string;
}

export type RequiredMedicalBookingForms = Required<
  NonNullableFields<IEditMedicalBookingForms>
>;

export function getValidationEditMedicalBookingFormsSchema(): Schema<IEditMedicalBookingForms> {
  return Yup.object().shape({
    name: REGEX_VALIDATION.REGEX_STRING,
    slug: Yup.string().trim(),
    image: Yup.string(),
  });
}
