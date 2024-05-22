"use client";
import React, {useMemo} from "react";
import {Formik, FormikHelpers} from "formik";
import {Col, Form, Row, Select} from "antd";
import FormItem from "@/components/FormItem";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";
import {ICategoryBody} from "@/apiRequest/ApiCategory";
import {InputGlobal} from "@/components/InputGlobal";
import {
  ICreateCategoryForm,
  RequiredCreateCategoryForm,
  getValidationCreateCategorySchema,
} from "@/module/category-management/modal-create-category/form-config";
import slugify from "slugify";
import {useCreateCategory} from "@/utils/hooks/category";
import {useAppDispatch} from "@/redux/store";
import {closeModal} from "@/redux/slices/ModalSlice";
import {useRouter} from "next/navigation";

export default function ContentModalCreateCategory({
  listCategory,
  refetch,
}: {
  listCategory: ICategoryBody[];
  refetch: () => void;
}): JSX.Element {
  const dispatch = useAppDispatch();
  const {mutate: CreateCategoryMutation} = useCreateCategory();
  const listCategories = useMemo(() => {
    return listCategory.map((cate) => {
      return {
        value: cate._id,
        label: <span key={cate._id}>{cate.name}</span>,
      };
    });
  }, [listCategory]);

  const handleCreateCategory = (
    values: ICreateCategoryForm,
    {setSubmitting}: FormikHelpers<RequiredCreateCategoryForm>,
  ) => {
    const _parent_id = Boolean(values.parent_id) ? values.parent_id : null;
    const data = Boolean(values.slug)
      ? {...values, parent_id: _parent_id}
      : {
          ...values,
          parent_id: _parent_id,
          slug: slugify(values.name, {
            lower: true,
            trim: true,
          }),
        };
    CreateCategoryMutation(data, {
      onSuccess: () => {
        dispatch(closeModal());
        refetch();
      },
      onError: () => setSubmitting(false),
    });
  };

  return (
    <Formik
      initialValues={{name: "", slug: "", parent_id: ""}}
      validateOnBlur
      validationSchema={getValidationCreateCategorySchema()}
      onSubmit={handleCreateCategory}
    >
      {({
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
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
                  />
                </FormItem>
                <FormItem label="Slug" name="slug" labelCol={{span: 24}}>
                  <InputGlobal
                    name="slug"
                    placeholder="Nhập slug"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormItem>
                <FormItem
                  label="Danh mục cha"
                  name="parent_id"
                  required
                  labelCol={{span: 24}}
                >
                  <Select
                    defaultValue={{
                      value: "",
                      label: "Không có danh mục cha",
                    }}
                    options={[
                      ...listCategories,
                      {value: "", label: "Không có danh mục cha"},
                    ]}
                    onChange={(value) => setFieldValue("parent_id", value)}
                  />
                </FormItem>
              </Col>
            </Row>
            <FooterModalButton
              textOk="Tạo danh mục"
              onOk={handleSubmit}
              isLoading={isSubmitting}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
}
