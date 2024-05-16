import React from "react";
import {Formik} from "formik";
import {Col, Form, Image, Input, Row, Select, Tabs, TimePicker} from "antd";
import FormItem from "@/components/FormItem";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";

const listBookingForms = [
  {
    value: 1,
    label: "Đặt khám theo chuyên khoa",
  },
  {
    value: 2,
    label: "Đặt khám theo bác sĩ",
  },
];
const listTypeHospital = [
  {
    value: 1,
    label: "Bệnh viện công",
  },
  {
    value: 2,
    label: "Bệnh viện tư",
  },
];
export default function ContentModalEditHospital() {
  const handleEditHospital = () => {
    //
  };
  return (
    <Formik
      initialValues={{email: "", password: ""}}
      validateOnChange={false}
      validateOnBlur
      // validationSchema={getValidationLoginSchema()}
      onSubmit={handleEditHospital}
    >
      {({
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
      }): JSX.Element => (
        <div className="modal-form-custom modal-form-hospital">
          <div className="avatar-container mb-3">
            <Image
              width={150}
              height={150}
              src={undefined || "/img/avatar/avatar.jpg"}
              style={{borderRadius: "50%", objectFit: "cover"}}
              fallback="/img/avatar/avatar.jpg"
            />
          </div>
          <Form onFinish={handleSubmit} labelAlign="left">
            <Tabs
              defaultActiveKey="1"
              className="modal-edit-hospital !h-[400px]"
            >
              <Tabs.TabPane tab="Cập nhật thông tin" key="1">
                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem
                      label="Tên bệnh viện"
                      name="name"
                      required
                      labelCol={{span: 24}}
                    >
                      <Input
                        name="name"
                        placeholder="Nhập tên bệnh viện"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormItem>
                    <FormItem
                      label="Slug"
                      name="slug"
                      required
                      labelCol={{span: 24}}
                    >
                      <Input
                        name="slug"
                        placeholder="Nhập slug"
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
                      label="Địa chỉ"
                      name="address"
                      required
                      labelCol={{span: 24}}
                    >
                      <Input.TextArea
                        name="address"
                        placeholder="Nhập địa chỉ"
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
                      label="Thời gian làm việc"
                      name="timeline"
                      required
                      labelCol={{span: 24}}
                    >
                      <TimePicker.RangePicker
                        format={"HH:mm"}
                        className="w-full"
                      />
                    </FormItem>
                    <FormItem
                      label="Hình thức đặt khám"
                      name="booking_forms"
                      required
                      labelCol={{span: 24}}
                    >
                      <Select
                        mode="multiple"
                        allowClear
                        options={listBookingForms}
                        placeholder="Please select"
                      />
                    </FormItem>
                    <FormItem
                      label="Loại bệnh viện"
                      name="booking_forms"
                      required
                      labelCol={{span: 24}}
                    >
                      <Select
                        mode="multiple"
                        allowClear
                        options={listTypeHospital}
                        placeholder="Please select"
                      />
                    </FormItem>
                  </Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Cập nhật ảnh" key="2">
                Chưa làm đến nhé!!
              </Tabs.TabPane>
              <Tabs.TabPane tab="Thông tin bác sĩ của bệnh viện" key="3">
                Chưa làm đến nhé!!
              </Tabs.TabPane>
            </Tabs>
            <FooterModalButton
              textOk="Sửa bệnh viện"
              onOk={handleSubmit}
              isLoading={isSubmitting}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
}
