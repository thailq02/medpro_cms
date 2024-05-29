"use client";
import React, {useMemo} from "react";
import {Formik, FormikHelpers} from "formik";
import {Col, Form, Row, Select} from "antd";
import FormItem from "@/components/FormItem";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";
import {IModalProps} from "@/types";
import {
   useQueryGetSpecialtyById,
   useUpdateSpecialty,
} from "@/utils/hooks/specialty";
import {
   IEditSpecialtyForm,
   getValidationEditSpecialtySchema,
} from "@/module/specialty-management/modal-edit-specialty/form-config";
import {InputGlobal, TextAreaGlobal} from "@/components/InputGlobal";
import {useAppDispatch} from "@/redux/store";
import {closeModal} from "@/redux/slices/ModalSlice";
import {autoSlugify} from "@/utils/constants/checkSlugify";
import {useQueryClient} from "@tanstack/react-query";
import QUERY_KEY from "@/config/QUERY_KEY";

interface IEditSpecialtyProps extends IModalProps {
   listHospital: {
      value?: string;
      label?: string;
   }[];
}

export default function ContentModalEditSpecialty({
   idSelect,
   refetch,
   listHospital,
}: IEditSpecialtyProps) {
   const dispatch = useAppDispatch();
   const {data: specialty} = useQueryGetSpecialtyById(idSelect as string);
   const {mutate: UpdateSpecialtyMutation} = useUpdateSpecialty();
   const queryClient = useQueryClient();

   const initialValues = useMemo(() => {
      return {
         name: specialty?.payload.data.name || "",
         hospital_id: specialty?.payload.data.hospital?._id || "",
         description: specialty?.payload.data.description || "",
         slug: specialty?.payload.data.slug || "",
      };
   }, [specialty]);

   const handleEditSpecialty = (
      values: IEditSpecialtyForm,
      {setSubmitting}: FormikHelpers<any>,
   ) => {
      const data = Boolean(values.slug)
         ? {...values}
         : {
              ...values,
              slug: autoSlugify(values.name),
           };
      UpdateSpecialtyMutation(
         {id: idSelect as string, body: data},
         {
            onSuccess: () => {
               queryClient.refetchQueries({
                  queryKey: [QUERY_KEY.GET_SPECIALTY_BY_ID, idSelect],
               });
               dispatch(closeModal());
               refetch && refetch();
            },
            onError: () => setSubmitting(false),
         },
      );
   };

   if (!specialty) return;
   return (
      <Formik
         initialValues={initialValues}
         validateOnBlur
         validationSchema={getValidationEditSpecialtySchema()}
         onSubmit={handleEditSpecialty}
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
                           label="Tên chuyên khoa"
                           name="name"
                           required
                           labelCol={{span: 24}}
                        >
                           <InputGlobal
                              name="name"
                              placeholder="Nhập tên chuyên khoa"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.name}
                           />
                        </FormItem>
                        <FormItem
                           label="Bệnh viện"
                           name="hospital_id"
                           required
                           labelCol={{span: 24}}
                        >
                           <Select
                              allowClear
                              options={listHospital}
                              placeholder="Chọn bệnh viện"
                              onChange={(value) =>
                                 setFieldValue("hospital_id", value)
                              }
                              value={values.hospital_id}
                           />
                        </FormItem>
                        <FormItem
                           label="Mô tả"
                           name="description"
                           required
                           labelCol={{span: 24}}
                        >
                           <TextAreaGlobal
                              name="description"
                              placeholder="Nhập mô tả"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.description}
                           />
                        </FormItem>
                        <FormItem
                           label="Slug"
                           name="slug"
                           required
                           labelCol={{span: 24}}
                        >
                           <TextAreaGlobal
                              name="slug"
                              placeholder="Nhập slug"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.slug}
                           />
                        </FormItem>
                     </Col>
                  </Row>
                  <FooterModalButton
                     textOk="Sửa chuyên khoa"
                     onOk={handleSubmit}
                     isLoading={isSubmitting}
                  />
               </Form>
            </div>
         )}
      </Formik>
   );
}
