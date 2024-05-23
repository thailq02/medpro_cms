"use client";
import React, {useMemo} from "react";
import {IModalProps} from "@/types";
import {Formik, FormikHelpers} from "formik";
import {Col, Form, Row, Select} from "antd";
import FormItem from "@/components/FormItem";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";
import {InputGlobal} from "@/components/InputGlobal";
import {ICategoryBody} from "@/apiRequest/ApiCategory";
import {
  useQueryGetCategoryById,
  useUpdateCategory,
} from "@/utils/hooks/category";
import {
  IEditCategoryForm,
  RequiredEditCategoryForm,
  getValidationEditCategorySchema,
} from "@/module/category-management/modal-edit-category/form-config";
import {useAppDispatch} from "@/redux/store";
import {closeModal} from "@/redux/slices/ModalSlice";
import {autoSlugify} from "@/utils/constants/checkSlugify";

export default function ContentModalEditCategory({
  listCategory,
  props,
}: {
  props: IModalProps;
  listCategory: ICategoryBody[];
}) {
  const {idSelect, refetch} = props;
  const dispatch = useAppDispatch();
  const {data: category} = useQueryGetCategoryById(idSelect);
  const {mutate: UpdateCategoryMutation} = useUpdateCategory();
  const initialValues = useMemo(() => {
    return {
      name: category?.payload?.data.name || "",
      slug: category?.payload?.data.slug || "",
      parent_id: category?.payload?.data.parent_id || null,
    };
  }, [category]);
  const listCategories = useMemo(() => {
    return listCategory.map((cate) => {
      return {
        value: cate._id,
        label: <span key={cate._id}>{cate.name}</span>,
      };
    });
  }, [listCategory]);
  const handleEditCategory = (
    values: IEditCategoryForm,
    {setSubmitting}: FormikHelpers<RequiredEditCategoryForm>,
  ) => {
    const _parent_id = Boolean(values.parent_id) ? values.parent_id : null;
    const data = Boolean(values.slug)
      ? {...values, parent_id: _parent_id}
      : {
          ...values,
          parent_id: _parent_id,
          slug: autoSlugify(values.name),
        };
    UpdateCategoryMutation(
      {id: idSelect as string, body: data},
      {
        onSuccess: () => {
          dispatch(closeModal());
          refetch!();
        },
        onError: () => setSubmitting(false),
      },
    );
  };
  if (!category) return;
  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      validationSchema={getValidationEditCategorySchema()}
      onSubmit={handleEditCategory}
    >
      {({
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
        values,
      }): JSX.Element => (
        <div className="modal-form-custom">
          <Form onFinish={handleSubmit} labelAlign="left">
            <Row gutter={24}>
              <Col span={24}>
                <FormItem
                  label="Tên danh mục"
                  name="name"
                  required
                  labelCol={{span: 24}}
                >
                  <InputGlobal
                    name="name"
                    placeholder="Nhập tên danh mục"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                </FormItem>
                <FormItem
                  label="Slug"
                  name="slug"
                  required
                  labelCol={{span: 24}}
                >
                  <InputGlobal
                    name="slug"
                    placeholder="Nhập slug"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.slug}
                  />
                </FormItem>
                <FormItem
                  label="Danh mục cha"
                  name="parent_id"
                  required
                  labelCol={{span: 24}}
                >
                  <Select
                    options={[
                      ...listCategories,
                      {value: "", label: "Không có danh mục cha"},
                    ]}
                    value={values.parent_id === null ? "" : values.parent_id}
                    onChange={(value) => setFieldValue("parent_id", value)}
                  />
                </FormItem>
              </Col>
            </Row>
            <FooterModalButton
              textOk="Sửa danh mục"
              onOk={handleSubmit}
              isLoading={isSubmitting}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
}
