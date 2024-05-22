"use client";
import {NonNullableFields} from "@/apiRequest/common";
import REGEX_VALIDATION from "@/utils/constants/regexValidation";
import * as Yup from "yup";
import {Schema} from "yup";

export interface ICreateCategoryForm {
  name: string;
  slug?: string;
  parent_id?: string | null;
}

export type RequiredCreateCategoryForm = Required<
  NonNullableFields<ICreateCategoryForm>
>;

export function getValidationCreateCategorySchema(): Schema<ICreateCategoryForm> {
  return Yup.object().shape({
    name: REGEX_VALIDATION.REGEX_STRING,
    slug: Yup.string().trim(),
    parent_id: Yup.string(),
  });
}
