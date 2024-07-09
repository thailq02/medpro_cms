import {ICategoryBody} from "@/apiRequest/ApiCategory";
import {CommonParams, ICommonAuditable, IMetaData} from "@/apiRequest/common";
import http from "@/apiRequest/http";

export interface IHospitalBody extends ICommonAuditable {
  _id?: string;
  name?: string;
  session?: string;
  slug?: string;
  description?: string;
  hotline?: string;
  start_time?: string;
  end_time?: string;
  address?: string;
  avatar?: string;
  banner?: string;
  images?: string[];
  types?: number[];
  category?: ICategoryBody;
  booking_forms?: {
    id?: string;
    name?: string;
    image?: string;
  }[];
  description_detail?: string | null;
}

export interface IParamsHospital {
  limit?: number;
  page?: number;
  search?: string;
}

interface IGetListHospitalRes {
  message: string;
  data: IHospitalBody[];
  meta: IMetaData;
}
export interface ICreateHospitalRes {
  message: string;
  data: IHospitalBody;
}
export interface ICreateHospitalForm {
  categoryId: string;
  name: string;
  slug?: string;
  description: string;
  session: string;
  start_time: string;
  end_time: string;
  hotline: string;
  address: string;
  avatar?: string;
  banner?: string;
  images?: string[];
  types: number[];
  booking_forms: string[];
  description_detail?: string | null;
}
interface IUpdateHospitalBody {
  id: string;
  data: ICreateHospitalForm;
}
const path = {
  root: "/hospitals",
  create: "/hospitals/create",
  update: "/hospitals/update",
};

const getListHospital = (params: IParamsHospital) => {
  return http.get<IGetListHospitalRes>(path.root, {
    params: params as CommonParams<IParamsHospital>,
    cache: "no-cache",
  });
};
const getHospitalById = (id: string) => {
  return http.get<ICreateHospitalRes>(`${path.root}/${id}`);
};
const createHospital = (data: ICreateHospitalForm) => {
  return http.post<{message: string}>(path.create, data);
};
const updateHospital = ({id, data}: IUpdateHospitalBody) => {
  return http.patch<ICreateHospitalRes>(`${path.update}/${id}`, data);
};
export default {
  getListHospital,
  createHospital,
  getHospitalById,
  updateHospital,
};
