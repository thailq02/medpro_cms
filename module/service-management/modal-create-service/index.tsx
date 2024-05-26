"use client";
import React, {useEffect} from "react";
import {Formik, FormikHelpers} from "formik";
import {Col, Form, Row, Select} from "antd";
import FormItem from "@/components/FormItem";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";
import {useCreateService} from "@/utils/hooks/service";
import {
  InputGlobal,
  InputNumberGlobal,
  TextAreaGlobal,
} from "@/components/InputGlobal";
import {getValidationCreateServiceSchema} from "@/module/service-management/modal-create-service/form-config";
import {ICreateServiceForm} from "@/apiRequest/ApiService";
import {useAppDispatch} from "@/redux/store";
import {closeModal} from "@/redux/slices/ModalSlice";
import {ISpecialtyBody} from "@/apiRequest/ApiSpecialty";

interface ICreateServiceProps {
  listHospital: {
    value?: string;
    label?: string;
  }[];
  refetch: () => void;
  dataSpecialty: ISpecialtyBody[];
}

export default function ContentModalCreateService({
  listHospital,
  refetch,
  dataSpecialty,
}: ICreateServiceProps) {
  const [hospitalSelected, setHospitalSelected] = React.useState<
    string | undefined
  >(undefined);
  const [listSpecialtySelected, setListSpecialtySelected] = React.useState<
    Array<{value: string; label: string}>
  >([]);
  const dispatch = useAppDispatch();
  const {mutate: CreateServiceMutation} = useCreateService();

  useEffect(() => {
    if (!!dataSpecialty) {
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
  }, [dataSpecialty, hospitalSelected]);

  const handleCreateService = (
    values: ICreateServiceForm,
    {setSubmitting}: FormikHelpers<any>,
  ) => {
    const data = {
      ...values,
      specialty_id: values.specialty_id === "" ? null : values.specialty_id,
    };
    CreateServiceMutation(data as any, {
      onSuccess: () => {
        dispatch(closeModal());
        refetch && refetch();
      },
      onError: () => setSubmitting(false),
    });
  };
  const initialValues = {
    hospital_id: "",
    specialty_id: "",
    name: "",
    description: "",
    note: "",
    price: 0,
    session: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      validationSchema={getValidationCreateServiceSchema()}
      onSubmit={handleCreateService}
    >
      {({
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
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
                    placeholder="Nhập giá tền"
                    formatter={(value): string =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value): string =>
                      value!.replace(/\$\s?|(,*)/g, "")
                    }
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
                      ...listSpecialtySelected,
                      {value: "", label: "Không có chuyên khoa"},
                    ]}
                    placeholder="Chọn chuyên khoa"
                    onChange={(value) => setFieldValue("specialty_id", value)}
                  />
                </FormItem>
              </Col>
            </Row>
            <FooterModalButton
              textOk="Tạo dịch vụ"
              onOk={handleSubmit}
              isLoading={isSubmitting}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
}
