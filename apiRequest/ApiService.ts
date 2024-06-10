import {CommonParams, ICommonAuditable, IMetaData} from "@/apiRequest/common";
import http from "@/apiRequest/http";

export interface IParamsService {
  page: number;
  limit: number;
  search?: string;
  hospital?: string;
  specialty?: string;
}
export interface IServiceBody extends ICommonAuditable {
  _id?: string;
  name?: string;
  description?: string;
  note?: string;
  price?: number;
  session?: string;
  type?: string;
  specialty?: {
    _id?: string;
    description?: string;
    hospital_id?: string;
    name?: string;
    slug?: string;
    created_at?: string;
    updated_at?: string;
  };
  hospital?: {
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
    categoryId?: string;
    booking_forms?: string[];
    updated_at?: string;
    created_at?: string;
  };
}
interface IGetListHospitalRes {
  message: string;
  data: IServiceBody[];
  meta: IMetaData;
}
interface IGetHospital {
  message: string;
  data: IServiceBody;
}
export interface ICreateServiceForm {
  hospital_id?: string;
  specialty_id?: string;
  name?: string;
  description?: string;
  note?: string;
  price?: number;
  session?: string;
  type?: string;
}
interface IUpdateServiceBody {
  id: string;
  body: ICreateServiceForm;
}
const path = {
  root: "/services",
  create: "/services/create",
  update: "/services/update",
  delete: "/services/delete",
};

const getListService = (params: IParamsService) => {
  return http.get<IGetListHospitalRes>(path.root, {
    cache: "no-cache",
    params: params as CommonParams<IParamsService>,
  });
};

const getServiceById = (id: string) => {
  return http.get<IGetHospital>(`${path.root}/${id}`);
};

const createService = (body: ICreateServiceForm) => {
  return http.post<{message: string}>(path.create, body);
};

const updateService = (data: IUpdateServiceBody) => {
  return http.patch<IGetHospital>(`${path.update}/${data.id}`, data.body);
};

const deleteService = (id: string) => {
  return http.delete<IGetHospital>(`${path.delete}/${id}`);
};

export default {
  getListService,
  createService,
  getServiceById,
  updateService,
  deleteService,
};
