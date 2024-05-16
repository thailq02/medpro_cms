import React from "react";
import {Formik} from "formik";
import {Col, Form, Input, Row, Select} from "antd";
import FormItem from "@/components/FormItem";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";
import {IModalProps} from "@/types";

const listDoctor = [
  {
    value: 1,
    label: "Bác sĩ Lê Quang Thái",
  },
  {
    value: 2,
    label: "Bác sĩ Quang Thái",
  },
];
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
export default function ContentModalEditDoctor(props: IModalProps) {
  const handleEditDoctor = () => {
    //
  };
  return (
    <Formik
      initialValues={{email: "", password: ""}}
      validateOnChange={false}
      validateOnBlur
      // validationSchema={getValidationLoginSchema()}
      onSubmit={handleEditDoctor}
    >
      {({
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
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
                  <Select
                    allowClear
                    options={listDoctor}
                    placeholder="Please select"
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
                    placeholder="Please select"
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
                  label="Chuyên trị"
                  name="therapy"
                  required
                  labelCol={{span: 24}}
                >
                  <Input.TextArea
                    name="therapy"
                    placeholder="Nhập chuyên trị"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="Giá tiền"
                  name="price"
                  required
                  labelCol={{span: 24}}
                >
                  <Input
                    name="price"
                    placeholder="Nhập giá tiền"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormItem>
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
