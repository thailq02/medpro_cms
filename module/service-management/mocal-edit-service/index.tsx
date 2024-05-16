import React from "react";
import {Formik} from "formik";
import {Col, Form, Input, Row, Select} from "antd";
import FormItem from "@/components/FormItem";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";
import {IModalProps} from "@/types";

const listSpecialty = [
  {
    value: 1,
    label: "Khoa ngoại thần kinh",
  },
  {
    value: 2,
    label: "Khoa ung bướu",
  },
];
const listHospital = [
  {
    value: 1,
    label: "Bệnh viện Bạch Mai",
  },
  {
    value: 2,
    label: "Bệnh viện Quân Đội 108",
  },
];
export default function ContentModalEditService(props: IModalProps) {
  const handleEditService = () => {
    //
  };
  return (
    <Formik
      initialValues={{email: "", password: ""}}
      validateOnChange={false}
      validateOnBlur
      // validationSchema={getValidationLoginSchema()}
      onSubmit={handleEditService}
    >
      {({
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
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
                  <Input
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
                  <Input.TextArea
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
                  <Input.TextArea
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
                  <Input.TextArea
                    name="price"
                    placeholder="Nhập giá tền"
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                  <Input
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
                    placeholder="Please select"
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
                    options={listSpecialty}
                    placeholder="Please select"
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
