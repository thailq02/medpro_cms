import {CommonParams, ICommonAuditable, IMetaData} from "@/apiRequest/common";
import http from "@/apiRequest/http";

export interface IMedicalBookingFormsRes extends ICommonAuditable {
  _id?: string;
  name?: string;
  slug?: string;
  image?: string;
}
export interface IParamsMedicalBookingForms {
  limit?: number;
  page?: number;
  search?: string;
}
export interface IGetListMedicalBookingFormsRes {
  message: string;
  data: IMedicalBookingFormsRes[];
  meta: IMetaData;
}
export interface IGetMedicalBookingFormsRes {
  message: string;
  data: IMedicalBookingFormsRes;
}
export interface ICreateMedicalBookingFormsReq {
  name: string;
  image?: string;
  slug: string;
}
interface IUpdateMedicalBookingForms {
  id: string;
  body: ICreateMedicalBookingFormsReq;
}
const path = {
  root: "/medical-booking-forms",
  create: "/medical-booking-forms/create",
  update: "/medical-booking-forms/update",
  delete: "/medical-booking-forms/delete",
};

const getListMedicalBookingForms = (params?: IParamsMedicalBookingForms) => {
  return http.get<IGetListMedicalBookingFormsRes>(path.root, {
    params: params as CommonParams<IParamsMedicalBookingForms>,
  });
};

const createMedicalBookingForms = (body: ICreateMedicalBookingFormsReq) => {
  return http.post<{message: string}>(path.create, body);
};

const getMedicalBookingFormsById = (id: string) => {
  return http.get<IGetMedicalBookingFormsRes>(`${path.root}/${id}`);
};

const updateMedicalBookingForms = (data: IUpdateMedicalBookingForms) => {
  return http.patch<IGetMedicalBookingFormsRes>(
    `${path.update}/${data.id}`,
    data.body,
  );
};

const deleteMedicalBookingForms = (id: string) => {
  return http.delete<IGetMedicalBookingFormsRes>(`${path.delete}/${id}`);
};

export default {
  getListMedicalBookingForms,
  createMedicalBookingForms,
  getMedicalBookingFormsById,
  updateMedicalBookingForms,
  deleteMedicalBookingForms,
};
