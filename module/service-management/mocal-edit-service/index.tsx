"use client";
import React, {useEffect, useMemo} from "react";
import {Formik, FormikHelpers} from "formik";
import {Col, Form, Row, Select} from "antd";
import FormItem from "@/components/FormItem";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";
import {IModalProps} from "@/types";
import {useQueryGetServiceById, useUpdateService} from "@/utils/hooks/service";
import {
  IEditServiceForm,
  getValidationEditServiceSchema,
} from "@/module/service-management/mocal-edit-service/form-config";
import {useAppDispatch} from "@/redux/store";
import {closeModal} from "@/redux/slices/ModalSlice";
import {InputGlobal, TextAreaGlobal} from "@/components/InputGlobal";
import {useRouter} from "next/navigation";
import {ISpecialtyBody} from "@/apiRequest/ApiSpecialty";

interface IEditServiceProps extends IModalProps {
  listHospital: {
    value?: string;
    label?: string;
  }[];
  dataSpecialty: ISpecialtyBody[];
}

export default function ContentModalEditService({
  listHospital,
  refetch,
  idSelect,
  dataSpecialty,
}: IEditServiceProps) {
  const {data: service} = useQueryGetServiceById(idSelect as string);
  const [hospitalSelected, setHospitalSelected] = React.useState<string>("");
  const [listSpecialtySelected, setListSpecialtySelected] = React.useState<
    Array<{value: string; label: string}>
  >([]);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {mutate: UpdateServiceMutation} = useUpdateService();

  useEffect(() => {
    if (service?.payload?.data?.hospital?._id) {
      setHospitalSelected(service.payload.data.hospital._id);
    }
  }, [service]);

  useEffect(() => {
    if (service?.payload.data) {
      if (hospitalSelected) {
        const filteredSpecialties = dataSpecialty.filter((v) => {
          return v.hospital?._id === hospitalSelected;
        });
        setListSpecialtySelected(
          filteredSpecialties.map(
            (v) =>
              ({
                value: v._id,
                label: v.name,
              }) as {value: string; label: string},
          ),
        );
      } else {
        setListSpecialtySelected(
          dataSpecialty?.map((v) => ({
            value: v._id,
            label: v.name,
          })) as {
            value: string;
            label: string;
          }[],
        );
      }
    }
  }, [service, hospitalSelected]);

  const initialValues = useMemo(() => {
    const data = service?.payload.data;
    return {
      hospital_id: data?.hospital?._id || "",
      specialty_id: data?.specialty?._id || "",
      name: data?.name || "",
      description: data?.description || "",
      note: data?.note || "",
      price: data?.price || 0,
      session: data?.session || "",
    };
  }, [service]);
  const handleEditService = (
    values: IEditServiceForm,
    {setSubmitting}: FormikHelpers<any>,
  ) => {
    const data = {
      ...values,
      specialty_id: values.specialty_id === "" ? null : values.specialty_id,
    };
    UpdateServiceMutation(
      {id: idSelect as string, body: data as any},
      {
        onSuccess: () => {
          dispatch(closeModal());
          refetch && refetch();
          router.refresh();
        },
        onError: () => setSubmitting(false),
      },
    );
  };
  if (!service) return;
  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      validationSchema={getValidationEditServiceSchema()}
      onSubmit={handleEditService}
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
          <Form onFinish={handleSubmit} labelAlign="left" className="relative">
            <Row gutter={24}>
              <Col span={12}>
                <FormItem
                  label="Tên dịch vụ"
                  name="name"
                  required
                  labelCol={{span: 24}}
                >
                  <InputGlobal
                    name="name"
                    placeholder="Nhập tên dịch vụ"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
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
                  label="Ghi chú"
                  name="note"
                  required
                  labelCol={{span: 24}}
                >
                  <TextAreaGlobal
                    name="note"
                    placeholder="Nhập ghi chú"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.note}
                  />
                </FormItem>
                <FormItem
                  label="Giá tiền"
                  name="price"
                  required
                  labelCol={{span: 24}}
                >
                  <InputGlobal
                    type="number"
                    name="price"
                    placeholder="Nhập giá tền"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                  />
                </FormItem>
              </Col>
              <Col span={12}>
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
                    onChange={(value) => {
                      setHospitalSelected(value);
                      setFieldValue("hospital_id", value);
                    }}
                    value={values.hospital_id}
                  />
                </FormItem>
                <FormItem
                  label="Chuyên khoa bệnh viện"
                  name="specialty_id"
                  required
                  labelCol={{span: 24}}
                >
                  <Select
                    allowClear
                    options={[
                      {value: "", label: "Không có chuyên khoa"},
                      ...listSpecialtySelected,
                    ]}
                    placeholder="Chọn chuyên khoa"
                    onChange={(value) => setFieldValue("specialty_id", value)}
                    value={
                      values.specialty_id === null ? "" : values.specialty_id
                    }
                  />
                </FormItem>
              </Col>
            </Row>
            <FooterModalButton
              textOk="Sửa dịch vụ"
              onOk={handleSubmit}
              isLoading={isSubmitting}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
}
