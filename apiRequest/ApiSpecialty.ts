import {CommonParams, ICommonAuditable, IMetaData} from "@/apiRequest/common";
import http from "@/apiRequest/http";

export interface IParamsSpecialty {
  page: number;
  limit: number;
  search?: string;
  hospital?: string;
}
export interface ISpecialtyBody extends ICommonAuditable {
  _id?: string;
  name?: string;
  slug?: string;
  description?: string;
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
    booking_forms?: {
      image?: string;
      name?: string;
    }[];
    updated_at?: string;
    created_at?: string;
  };
}
interface IGetListSpecialtyRes {
  message: string;
  data: ISpecialtyBody[];
  meta: IMetaData;
}
interface IGetSpecialtyRes {
  message: string;
  data: ISpecialtyBody;
}
interface ICreateSpecialtyBody {
  hospital_id?: string;
  name?: string;
  slug?: string;
  description?: string;
}
interface IUpdateSpecialtyBody {
  id: string;
  body: ICreateSpecialtyBody;
}
const path = {
  root: "/specialties",
  create: "/specialties/create",
  update: "/specialties/update",
  delete: "/specialties/delete",
};

const getListSpecialty = (params: IParamsSpecialty) => {
  return http.get<IGetListSpecialtyRes>(path.root, {
    cache: "no-cache",
    params: params as CommonParams<IParamsSpecialty>,
  });
};

const getSpecialtyById = (id: string) => {
  return http.get<IGetSpecialtyRes>(`${path.root}/${id}`);
};

const createSpecialty = (body: ICreateSpecialtyBody) => {
  return http.post<{meesage: string}>(path.create, body);
};

const updateSpecialty = (body: IUpdateSpecialtyBody) => {
  return http.patch<IGetSpecialtyRes>(`${path.update}/${body.id}`, body.body);
};

const deleteSpecialty = (id: string) => {
  return http.delete<IGetSpecialtyRes>(`${path.delete}/${id}`);
};

export default {
  getListSpecialty,
  createSpecialty,
  getSpecialtyById,
  updateSpecialty,
  deleteSpecialty,
};
