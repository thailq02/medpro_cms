"use client";
import ApiUploadImage from "@/apiRequest/ApiUploadImage";
import {QUERY_PARAMS} from "@/apiRequest/common";
import FormItem from "@/components/FormItem";
import {InputGlobal, TextAreaGlobal} from "@/components/InputGlobal";
import {FooterModalButton} from "@/components/ModalGlobal/FooterModalButton";
import UploadImageGlobal, {getBase64} from "@/components/UploadGlobal";
import QUERY_KEY from "@/config/QUERY_KEY";
import {
  IEditHospital,
  getValidationEditHospitalSchema,
} from "@/module/hospital-management/modal-edit-hospital/form-config";
import {closeModal} from "@/redux/slices/ModalSlice";
import {useAppDispatch} from "@/redux/store";
import {IModalProps, PositionType} from "@/types";
import {autoSlugify} from "@/utils/constants/checkSlugify";
import {IMAGE_FORMATS_ACCEPTED} from "@/utils/constants/regexValidation";
import {OPTIONS} from "@/utils/constants/selectList";
import {useQueryGetListDoctor} from "@/utils/hooks/doctor";
import {
  useQueryGetHospitalById,
  useUpdateHospital,
} from "@/utils/hooks/hospital";
import {CameraFilled, LoadingOutlined} from "@ant-design/icons";
import {useQueryClient} from "@tanstack/react-query";
import {Col, Form, Image, Row, Select, Tabs, TimePicker, Upload} from "antd";
import {RcFile} from "antd/es/upload";
import dayjs from "dayjs";
import {Formik, FormikHelpers} from "formik";
import {useRouter} from "next/navigation";
import {useEffect, useMemo, useState} from "react";
import "../modal-create-hospital/index.scss";

interface IEditHospitalProps extends IModalProps {
  listMedicalBookingForms: {
    value?: string;
    label?: string;
  }[];
  listCategories: {
    value?: string;
    label?: JSX.Element;
  }[];
}

export default function ContentModalEditHospital({
  idSelect,
  refetch,
  listMedicalBookingForms,
  listCategories,
}: IEditHospitalProps) {
  const [imageUrl, setImageUrl] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const {data: hospitals} = useQueryGetHospitalById(idSelect as string);
  const {data: doctors} = useQueryGetListDoctor(QUERY_PARAMS);
  const {mutate: UpdateHospitalMutation} = useUpdateHospital();

  const queryClient = useQueryClient();

  const initialValues = useMemo(() => {
    const data = hospitals?.payload?.data;
    return {
      categoryId: data?.category?._id || "",
      name: data?.name || "",
      slug: data?.slug || "",
      description: data?.description || "",
      session: data?.session || "",
      hotline: data?.hotline || "",
      address: data?.address || "",
      avatar: data?.avatar || "",
      banner: data?.banner || "",
      images: data?.images || [],
      start_time: data?.start_time || "",
      end_time: data?.end_time || "",
      types: data?.types || [],
      booking_forms: data?.booking_forms?.map((i) => i.id as string) || [],
    };
  }, [hospitals]);

  const listOurDoctors = useMemo(() => {
    if (doctors?.payload?.data) {
      return doctors.payload.data.filter(
        (item) => item.hospital_id === idSelect,
      );
    }
  }, [doctors?.payload?.data]);

  useEffect(() => {
    if (hospitals) {
      setImageUrl(hospitals.payload.data.avatar);
    }
  }, [hospitals?.payload.data.avatar]);

  const handleEditHospital = async (
    _values: IEditHospital,
    {setSubmitting}: FormikHelpers<any>,
  ) => {
    const formData = new FormData();
    let values = _values;
    if (initialValues.avatar === values.avatar) {
      formData.delete("avatar");
    }
    if (initialValues.banner === values.banner) {
      formData.delete("cover_photo");
    }
    const data = Boolean(values.slug)
      ? values
      : {
          ...values,
          slug: autoSlugify(values.name),
        };
    if (values.avatar && typeof values.avatar !== "string") {
      formData.append("image", values.avatar);
      const imageUrl = await ApiUploadImage.uploadImage(formData);
      values = {
        ...data,
        avatar: imageUrl?.payload?.data[0].url,
      };
    }
    if (values.images && values.images.length > 0) {
      const images = values.images.filter((i) => {
        return typeof i !== "string";
      });
      if (images.length > 0) {
        images.forEach((image) => {
          formData.append("images", image);
        });
        const imageUrls = await ApiUploadImage.uploadImage(formData);
        const newImages = imageUrls?.payload?.data.map(
          (i) => i.url,
        ) as string[];
        values = {
          ...data,
          images: [...values.images, ...newImages],
        };
      }
    }
    if (values.banner && typeof values.banner !== "string") {
      formData.append("cover_photo", values.banner);
      const bannerUrl = await ApiUploadImage.uploadImage(formData);
      values = {
        ...data,
        banner: bannerUrl?.payload?.data[0].url,
      };
    }
    UpdateHospitalMutation(
      {id: idSelect as string, data: values},
      {
        onSuccess: () => {
          queryClient.refetchQueries({
            queryKey: [QUERY_KEY.GET_HOSPITAL_BY_ID, idSelect],
          });
          dispatch(closeModal());
          refetch && refetch();
          router.refresh();
        },
        onError: () => setSubmitting(false),
      },
    );
  };
  if (!hospitals || !doctors) return;
  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      validationSchema={getValidationEditHospitalSchema()}
      onSubmit={handleEditHospital}
    >
      {({
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
        values,
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
                      <InputGlobal
                        name="name"
                        placeholder="Nhập tên bệnh viện"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
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
                        value={values.slug}
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
                        value={values.address}
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
                        value={values.hotline}
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
                        value={values.categoryId}
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
                    <FormItem
                      label="Thời gian làm việc"
                      name="timeline"
                      required
                      labelCol={{span: 24}}
                    >
                      <TimePicker.RangePicker
                        format={"HH:mm"}
                        className="w-full"
                        onChange={(value) => {
                          if (value?.[0] && value?.[1]) {
                            setFieldValue(
                              "start_time",
                              value[0].format("HH:mm"),
                            );
                            setFieldValue("end_time", value[1].format("HH:mm"));
                          } else {
                            setFieldValue("start_time", "");
                            setFieldValue("end_time", "");
                          }
                        }}
                        value={
                          values.start_time && values.end_time
                            ? [
                                dayjs(values.start_time.toString(), "HH:mm"),
                                dayjs(values.end_time.toString(), "HH:mm"),
                              ]
                            : undefined
                        }
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
                        value={values?.booking_forms?.map((item) => {
                          return listMedicalBookingForms.find(
                            (i) => i.value === item,
                          );
                        })}
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
                        value={values.types}
                      />
                    </FormItem>
                  </Col>
                </Row>
              </Tabs.TabPane>

              <Tabs.TabPane tab="Cập nhật ảnh" key="2">
                <div className="mb-5">
                  <UploadImageGlobal
                    type="thumbnail"
                    label="Ảnh banner"
                    url={values.banner}
                    onChange={(value) =>
                      setFieldValue("banner", value as RcFile)
                    }
                  />
                </div>
                <div className="pb-5">
                  <UploadImageGlobal
                    type="multiple"
                    label="Ảnh liên quan đến bệnh viện"
                    onChange={(value) =>
                      setFieldValue("images", value as RcFile[])
                    }
                  />
                </div>
              </Tabs.TabPane>

              <Tabs.TabPane tab="Thông tin bác sĩ của bệnh viện" key="3">
                <div className="w-full h-full grid grid-cols-2 gap-5">
                  {listOurDoctors?.length! > 0 ? (
                    listOurDoctors?.map((doctor) => {
                      let position = "";
                      switch (doctor.position) {
                        case PositionType.DOCTOR:
                          position = "Tiến sĩ";
                          break;
                        case PositionType.MASTER:
                          position = "Thạc sĩ";
                          break;
                        case PositionType.PROFESSOR:
                          position = "Giáo sư";
                          break;
                        case PositionType.ASSOCIATE_PROFESSOR:
                          position = "Phó giáo sư";
                          break;
                        default:
                          return "Không có chức vụ";
                      }
                      return (
                        <div
                          className="border border-gray-300 flex w-[450px]"
                          key={doctor._id}
                        >
                          <img
                            src={doctor.avatar || "/img/avatar/avatar.jpg"}
                            alt="Avatar"
                            className="w-[150px] object-cover"
                          />
                          <div className="flex flex-col p-3 justify-center gap-1">
                            <strong>Họ tên: {doctor.name}</strong>
                            <strong>Trình độ: {position}</strong>
                            <strong>
                              Chuyên khoa: {doctor.specialty?.name}
                            </strong>
                            <strong>Email: {doctor.email}</strong>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <span className="font-bold text-lg">Chưa có bác sĩ</span>
                  )}
                </div>
              </Tabs.TabPane>

              <Tabs.TabPane tab="Ảnh bệnh viện" key="4">
                <div className="w-full h-full flex flex-wrap gap-5">
                  {values.images.length > 0 ? (
                    values.images?.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        width={300}
                        height={200}
                        alt="Image"
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    ))
                  ) : (
                    <span className="font-bold text-lg">Chưa có ảnh</span>
                  )}
                </div>
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
