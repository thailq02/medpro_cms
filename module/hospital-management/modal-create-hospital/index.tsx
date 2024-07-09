"use client";
import ApiUploadImage from "@/apiRequest/ApiUploadImage";
import FormItem from "@/components/FormItem";
import {InputGlobal, TextAreaGlobal} from "@/components/InputGlobal";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";
import TextEditorGlobal from "@/components/TextEditorGlobal";
import {getBase64} from "@/components/UploadGlobal";
import {
  ICreateHospital,
  getValidationCreateHospitalSchema,
} from "@/module/hospital-management/modal-create-hospital/form-config";
import {closeModal} from "@/redux/slices/ModalSlice";
import {useAppDispatch} from "@/redux/store";
import {autoSlugify} from "@/utils/constants/checkSlugify";
import {IMAGE_FORMATS_ACCEPTED} from "@/utils/constants/regexValidation";
import {OPTIONS} from "@/utils/constants/selectList";
import {useCreateHospital} from "@/utils/hooks/hospital";
import {CameraFilled, LoadingOutlined} from "@ant-design/icons";
import {Col, Form, Image, Row, Select, TimePicker, Upload} from "antd";
import {RcFile} from "antd/es/upload";
import {Formik, FormikHelpers} from "formik";
import {useMemo, useState} from "react";
import "./index.scss";
interface IHospitalProps {
  refetch?: () => void;
  listMedicalBookingForms: {
    value?: string;
    label?: string;
  }[];
  listCategories: {
    value?: string;
    label?: JSX.Element;
  }[];
}

export default function ContentModalCreateHospital({
  refetch,
  listMedicalBookingForms,
  listCategories,
}: IHospitalProps) {
  const [imageUrl, setImageUrl] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {mutate: CreateHospitalMutation} = useCreateHospital();

  const handleCreateHospital = async (
    _values: ICreateHospital,
    {setSubmitting}: FormikHelpers<any>,
  ) => {
    const formData = new FormData();
    let values = _values;
    const descDetail = Boolean(values.description_detail)
      ? values.description_detail
      : null;
    const data = Boolean(values.slug)
      ? {
          ...values,
          description_detail: descDetail,
        }
      : {
          ...values,
          slug: autoSlugify(values.name),
          description_detail: descDetail,
        };
    if (values.avatar && typeof values.avatar !== "string") {
      formData.append("image", values.avatar);
      const imageUrl = await ApiUploadImage.uploadImage(formData);
      values = {
        ...data,
        avatar: imageUrl.payload?.data[0].url,
      };
    } else {
      values = data;
    }
    CreateHospitalMutation(values, {
      onSuccess: () => {
        dispatch(closeModal());
        refetch && refetch();
      },
      onError: () => setSubmitting(false),
    });
  };

  const initialValues = useMemo(() => {
    return {
      categoryId: "",
      name: "",
      slug: "",
      description: "",
      session: "",
      hotline: "",
      address: "",
      avatar: "",
      banner: "",
      images: [],
      start_time: "",
      end_time: "",
      types: [],
      booking_forms: [],
      description_detail: "",
    };
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      validationSchema={getValidationCreateHospitalSchema()}
      onSubmit={handleCreateHospital}
    >
      {({
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        setFieldValue,
      }): JSX.Element => (
        <div className="modal-form-custom modal-form-hospital">
          <div className="avatar-container mb-7">
            <Image
              width={300}
              height={150}
              src={imageUrl || "/img/avatar/avatar.jpg"}
              style={{borderRadius: "10%", objectFit: "cover"}}
              fallback="/img/avatar/avatar.jpg"
            />
            <div className="button-update-avatar">
              <Upload
                multiple={false}
                listType="picture-card"
                name="avatar"
                accept={IMAGE_FORMATS_ACCEPTED.join(",")}
                onChange={(image) => {
                  if (image.file.status === "uploading") {
                    setLoading(true);
                    return;
                  }
                  const latestFile = image.fileList[image.fileList.length - 1];
                  if (latestFile && latestFile.status !== "uploading") {
                    image.fileList = [latestFile];
                    getBase64(latestFile.originFileObj as RcFile, (url) => {
                      setLoading(false);
                      setImageUrl(url);
                    });
                    setFieldValue("avatar", latestFile.originFileObj as File);
                  }
                }}
                beforeUpload={() => false}
                showUploadList={false}
              >
                {loading ? (
                  <LoadingOutlined className="icon-update-avatar" />
                ) : (
                  <CameraFilled className="icon-update-avatar" />
                )}
              </Upload>
            </div>
          </div>
          <Form onFinish={handleSubmit} labelAlign="left" className="relative">
            <Row gutter={24} className="modal-create-hospital !h-[350px]">
              <Col span={12}>
                <FormItem
                  label="Tên bệnh viện"
                  name="name"
                  required
                  labelCol={{span: 24}}
                >
                  <InputGlobal
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
                  <InputGlobal
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
                  <TextAreaGlobal
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
                  <TextAreaGlobal
                    name="address"
                    placeholder="Nhập địa chỉ"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="Điện thoại liên hệ"
                  name="hotline"
                  required
                  labelCol={{span: 24}}
                >
                  <InputGlobal
                    name="hotline"
                    placeholder="Nhập số điện thoại liên hệ"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormItem>
                <FormItem
                  label="Chọn danh mục"
                  name="categoryId"
                  required
                  labelCol={{span: 24}}
                >
                  <Select
                    options={listCategories}
                    onChange={(value) => setFieldValue("categoryId", value)}
                    placeholder="Chọn danh mục"
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
                  />
                </FormItem>
                <FormItem
                  label="Thời gian làm việc"
                  name="start_time"
                  required
                  labelCol={{span: 24}}
                >
                  <TimePicker.RangePicker
                    format={"HH:mm"}
                    className="w-full"
                    placeholder={["Thời gian bắt đầu", "Thời gian kết thúc"]}
                    onChange={(value) => {
                      if (value?.[0] && value?.[1]) {
                        setFieldValue("start_time", value[0].format("HH:mm"));
                        setFieldValue("end_time", value[1].format("HH:mm"));
                      }
                    }}
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
                    options={listMedicalBookingForms}
                    placeholder="Chọn hình thức đặt khám"
                    onChange={(value) => {
                      setFieldValue("booking_forms", value);
                    }}
                  />
                </FormItem>
                <FormItem
                  label="Loại bệnh viện"
                  name="types"
                  required
                  labelCol={{span: 24}}
                >
                  <Select
                    mode="multiple"
                    allowClear
                    options={OPTIONS.LIST_HOSPITAL_TYPE}
                    placeholder="Chọn loại bệnh viện"
                    onChange={(value) => {
                      setFieldValue("types", value);
                    }}
                  />
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem
                  label="Mô tả chi tiết"
                  name="description_detail"
                  required
                  labelCol={{span: 24}}
                >
                  <TextEditorGlobal
                    onChange={(value) => {
                      setFieldValue("description_detail", value);
                    }}
                    value={values.description_detail}
                  />
                </FormItem>
              </Col>
            </Row>
            <FooterModalButton
              className="bg-white"
              textOk="Tạo bệnh viện"
              onOk={handleSubmit}
              isLoading={isSubmitting}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
}
