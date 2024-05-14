import React from "react";
import {Field, FieldProps, getIn, FieldConfig} from "formik";
import {Form} from "antd";
import "./index.scss";
import {FormItemProps as $FormItemProps} from "antd/lib/form/FormItem";

export type FormItemProps = {
  showValidateSuccess?: boolean;
  showInitialErrorAfterTouched?: boolean;
  children: React.ReactNode;
} & {name: string} & $FormItemProps &
  Pick<FieldConfig, "validate">;

export default function FormItem({
  name,
  showValidateSuccess,
  showInitialErrorAfterTouched = false,
  children,
  validate,
  ...restProps
}: FormItemProps): JSX.Element {
  return (
    <Field name={name} validate={validate}>
      {({
        form: {errors = {}, touched = {}, initialErrors = {}},
      }: FieldProps): JSX.Element => {
        const error = getIn(errors, name, undefined);
        const initialError = getIn(initialErrors, name, undefined);
        let isTouched = getIn(touched, name, false) as boolean | boolean[];
        if (Array.isArray(isTouched)) {
          isTouched =
            isTouched.length === 0
              ? true
              : isTouched.reduce((acc, value) => acc || value, false);
        }
        //  error === undefined là không có lỗi
        const hasError = error !== undefined && isTouched;
        const hasInitialError = initialError !== undefined;
        const isValid = !error && isTouched;
        const showHelp =
          hasError ||
          (hasInitialError && (!isTouched || showInitialErrorAfterTouched));

        return (
          <Form.Item
            htmlFor={name}
            id={name}
            validateStatus={
              hasError || (hasInitialError && !isTouched)
                ? "error"
                : isValid && showValidateSuccess
                  ? "success"
                  : undefined
            }
            hasFeedback={isValid}
            help={
              showHelp ? (
                <>
                  {hasError && <li>{error}</li>}
                  {hasInitialError &&
                    (!isTouched || showInitialErrorAfterTouched) && (
                      <li>{initialError}</li>
                    )}
                </>
              ) : null
            }
            {...restProps}
          >
            {children}
          </Form.Item>
        );
      }}
    </Field>
  );
}
