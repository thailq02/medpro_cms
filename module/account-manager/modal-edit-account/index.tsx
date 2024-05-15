import React from "react";
import {
  GenderType,
  IAccountRole,
  IModalProps,
  PositionType,
  VerifyStatus,
} from "@/types";
import {Formik} from "formik";
import {Col, DatePicker, Form, Input, Row, Select} from "antd";
import FormItem from "@/components/FormItem";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";

const listGender = [
  {
    value: GenderType.MALE,
    label: <span>Nam</span>,
  },
  {
    value: GenderType.FEMALE,
    label: <span>Nữ</span>,
  },
];

const listPosition = [
  {
    value: PositionType.NONE,
    label: <span>Người dùng</span>,
  },
  {
    value: PositionType.MASTER,
    label: <span>Thạc sĩ</span>,
  },
  {
    value: PositionType.DOCTOR,
    label: <span>Tiến sĩ</span>,
  },
  {
    value: PositionType.ASSOCIATE_PROFESSOR,
    label: <span>Phó giáo sư</span>,
  },
  {
    value: PositionType.PROFESSOR,
    label: <span>Giáo sư</span>,
  },
];

const listRole = [
  {
    value: IAccountRole.ADMIN,
    label: <span>Admin</span>,
  },
  {
    value: IAccountRole.DOCTOR,
    label: <span>Bác sĩ</span>,
  },
  {
    value: IAccountRole.USER,
    label: <span>Người dùng</span>,
  },
];

const listVerifyStatus = [
  {
    value: VerifyStatus.UNVERIFIED,
    label: <span>Chưa xác thực</span>,
  },
  {
    value: VerifyStatus.VERIFIED,
    label: <span>Đã xác thực</span>,
  },
  {
    value: VerifyStatus.BANNED,
    label: <span>Khoá tài khoản</span>,
  },
];

export default function ContentModalEditAccount(props: IModalProps) {
  const handleEditAccount = () => {
    //
  };
  return (
    <Formik
      initialValues={{email: "", password: ""}}
      validateOnChange={false}
      validateOnBlur
      // validationSchema={getValidationLoginSchema()}
      onSubmit={handleEditAccount}
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
                  label="Họ và tên"
                  name="name"
                  required
                  labelCol={{span: 24}}
                >
                  <Input
                    name="email"
                    placeholder="Nhập tài khoản"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormItem>
                <FormItem
                  label="Email"
                  name="email"
                  required
                  labelCol={{span: 24}}
                >
                  <Input
                    name="email"
                    placeholder="Nhập tài khoản"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormItem>
                <FormItem
                  label="Mật khẩu"
                  name="password"
                  required
                  labelCol={{span: 24}}
                >
                  <Input.Password
                    name="password"
                    placeholder="Nhập mật khẩu"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormItem>
                <FormItem
                  label="Ngày sinh"
                  name="date_of_birth"
                  required
                  labelCol={{span: 24}}
                >
                  <DatePicker format={"DD/MM/YYYY"} className="w-full" />
                </FormItem>
                <FormItem
                  label="Giới tính"
                  name="gender"
                  required
                  labelCol={{span: 24}}
                >
                  <Select options={listGender} />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="Username"
                  name="username"
                  labelCol={{span: 24}}
                >
                  <Input
                    name="username"
                    placeholder="Nhập username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormItem>
                <FormItem
                  label="Số điện thoại"
                  name="phone_number"
                  labelCol={{span: 24}}
                >
                  <Input
                    name="phone_number"
                    placeholder="Nhập số điện thoại"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormItem>
                <FormItem label="Vị trí " name="position" labelCol={{span: 24}}>
                  <Select options={listPosition} />
                </FormItem>
                <FormItem label="Chức vụ" name="role" labelCol={{span: 24}}>
                  <Select options={listRole} />
                </FormItem>
                <FormItem
                  label="Trạng thái"
                  name="verify"
                  labelCol={{span: 24}}
                >
                  <Select options={listVerifyStatus} />
                </FormItem>
              </Col>
            </Row>
            <FooterModalButton
              textOk="Sửa tài khoản"
              onOk={handleSubmit}
              isLoading={isSubmitting}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
}
