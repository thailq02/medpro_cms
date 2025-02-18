"use client";
import React, {useMemo} from "react";
import {Formik, FormikHelpers} from "formik";
import {Col, Form, Row, Select} from "antd";
import FormItem from "@/components/FormItem";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";
import {InputGlobal} from "@/components/InputGlobal";
import {
  ICreateCategoryForm,
  RequiredCreateCategoryForm,
  getValidationCreateCategorySchema,
} from "@/module/category-management/modal-create-category/form-config";
import {
  useCreateCategory,
  useQueryGetListCategory,
} from "@/utils/hooks/category";
import {useAppDispatch} from "@/redux/store";
import {closeModal} from "@/redux/slices/ModalSlice";
import {autoSlugify} from "@/utils/constants/checkSlugify";

export default function ContentModalCreateCategory({
  refetch,
}: {
  refetch: () => void;
}): JSX.Element {
  const dispatch = useAppDispatch();
  const {mutate: CreateCategoryMutation} = useCreateCategory();
  const {data: categories} = useQueryGetListCategory({page: 1, limit: 99});

  const listCategories = useMemo(() => {
    return categories?.payload?.data.map((cate) => {
      return {
        value: cate._id,
        label: <span key={cate._id}>{cate.name}</span>,
      };
    });
  }, [categories?.payload?.data]);

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
          slug: autoSlugify(values.name),
        };
    CreateCategoryMutation(data, {
      onSuccess: () => {
        dispatch(closeModal());
        refetch();
      },
      onError: () => setSubmitting(false),
    });
  };

  if (!categories) return <></>;
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
                      ...(listCategories || []),
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
