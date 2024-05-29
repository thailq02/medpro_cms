"use client";
import React, {useEffect, useMemo, useState} from "react";
import {Formik, FormikHelpers} from "formik";
import {Col, Form, Row, Select} from "antd";
import FormItem from "@/components/FormItem";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";
import {IModalProps} from "@/types";
import {
   InputGlobal,
   InputNumberGlobal,
   TextAreaGlobal,
} from "@/components/InputGlobal";
import {useAppDispatch} from "@/redux/store";
import {useQueryGetDoctorById, useUpdateDoctor} from "@/utils/hooks/doctor";
import {closeModal} from "@/redux/slices/ModalSlice";
import {
   IEditDoctorForm,
   getValidationEditDoctorSchema,
} from "@/module/doctor-management/modal-edit-doctor/form-config";
import {ISpecialtyBody} from "@/apiRequest/ApiSpecialty";
import {useQueryClient} from "@tanstack/react-query";
import QUERY_KEY from "@/config/QUERY_KEY";

interface IEditDoctorProps extends IModalProps {
   listHospital: {value?: string; label?: JSX.Element}[];
   dataSpecialties: ISpecialtyBody[];
}

export default function ContentModalEditDoctor({
   refetch,
   listHospital,
   idSelect,
   dataSpecialties,
}: IEditDoctorProps) {
   const dispatch = useAppDispatch();
   const {data: doctor} = useQueryGetDoctorById(idSelect as string);

   const [selectedHospital, setSelectedHospital] = useState<string>("");
   const [listSpecialty, setListSpecialty] = useState<
      Array<{value: string; label: string}>
   >([]);

   const {mutate: UpdateDoctorMutation} = useUpdateDoctor();
   const queryClient = useQueryClient();

   useEffect(() => {
      if (doctor?.payload?.data?.hospital_id) {
         setSelectedHospital(doctor.payload.data.hospital_id);
      }
   }, [doctor]);

   const initialValues: IEditDoctorForm = useMemo(() => {
      const d = doctor?.payload?.data;
      return {
         hospital_id: d?.hospital_id || "",
         specialty_id: d?.specialty?._id || "",
         description: d?.description || "",
         therapy: d?.therapy || "",
         price: d?.price || 0,
         session: d?.session || "",
      };
   }, [doctor]);

   useEffect(() => {
      if (dataSpecialties && selectedHospital) {
         const filteredSpecialties = dataSpecialties.filter(
            (v) => v.hospital?._id === selectedHospital,
         );
         setListSpecialty(
            filteredSpecialties.map(
               (v) =>
                  ({value: v._id, label: v.name}) as {
                     value: string;
                     label: string;
                  },
            ),
         );
      }
   }, [dataSpecialties, selectedHospital]);

   const handleEditDoctor = (
      values: IEditDoctorForm,
      {setSubmitting}: FormikHelpers<IEditDoctorForm>,
   ) => {
      UpdateDoctorMutation(
         {id: idSelect as string, body: values},
         {
            onSuccess: () => {
               queryClient.refetchQueries({
                  queryKey: [QUERY_KEY.GET_DOCTOR_BY_ID, idSelect],
               });
               dispatch(closeModal());
               refetch && refetch();
            },
            onError: () => setSubmitting(false),
         },
      );
   };
   if (!doctor) return;
   return (
      <Formik
         initialValues={initialValues}
         validateOnBlur
         validationSchema={getValidationEditDoctorSchema()}
         onSubmit={handleEditDoctor}
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
                     <Col span={12}>
                        <FormItem
                           label="Tên bác sĩ"
                           name="doctor_id"
                           required
                           labelCol={{span: 24}}
                        >
                           <InputGlobal
                              name="doctor_id"
                              value={doctor.payload.data.name}
                              readOnly
                              disabled
                           />
                        </FormItem>
                        <FormItem
                           label="Giá tiền"
                           name="price"
                           required
                           labelCol={{span: 24}}
                        >
                           <InputNumberGlobal
                              name="price"
                              placeholder="Nhập giá tiền"
                              value={values.price}
                              formatter={(value): string =>
                                 `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ",",
                                 )
                              }
                              parser={(value): string =>
                                 value!.replace(/\$\s?|(,*)/g, "")
                              }
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
                           label="Chuyên trị"
                           name="therapy"
                           required
                           labelCol={{span: 24}}
                        >
                           <TextAreaGlobal
                              name="therapy"
                              placeholder="Nhập chuyên trị"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.therapy}
                           />
                        </FormItem>
                     </Col>
                     <Col span={12}>
                        <FormItem
                           label="Bệnh viện trực thuộc"
                           name="hospital_id"
                           required
                           labelCol={{span: 24}}
                        >
                           <Select
                              allowClear
                              options={listHospital}
                              placeholder="Chọn bệnh viện trực thuộc"
                              onChange={(value) => {
                                 setSelectedHospital(value);
                                 setFieldValue("hospital_id", value);
                              }}
                              value={values.hospital_id}
                           />
                        </FormItem>
                        <FormItem
                           label="Chuyên khoa"
                           name="specialty_id"
                           required
                           labelCol={{span: 24}}
                        >
                           <Select
                              allowClear
                              options={listSpecialty}
                              placeholder="Chọn chuyên khoa"
                              onChange={(value) =>
                                 setFieldValue("specialty_id", value)
                              }
                              value={values.specialty_id}
                              optionRender={(v) => {
                                 return <span>{v.label}</span>;
                              }}
                           />
                        </FormItem>
                        <FormItem
                           label="Lịch làm việc"
                           name="session"
                           required
                           labelCol={{span: 24}}
                        >
                           <InputGlobal
                              name="session"
                              placeholder="Nhập lịch làm việc"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.session}
                           />
                        </FormItem>
                     </Col>
                  </Row>
                  <FooterModalButton
                     textOk="Sửa bác sĩ"
                     onOk={handleSubmit}
                     isLoading={isSubmitting}
                  />
               </Form>
            </div>
         )}
      </Formik>
   );
}
