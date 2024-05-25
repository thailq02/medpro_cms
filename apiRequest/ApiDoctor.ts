import {CommonParams, ICommonAuditable, IMetaData} from "@/apiRequest/common";
import http from "@/apiRequest/http";

export interface IParamsDoctor {
  limit: number;
  page: number;
  search?: string;
  hospital?: string;
  specialty?: string;
}
export interface IDoctorBody extends ICommonAuditable {
  _id?: string;
  hospital_id?: string;
  address?: string;
  avatar?: string;
  date_of_birth?: string;
  description?: string;
  doctor_id?: string;
  email?: string;
  gender?: number;
  name?: string;
  phone_number?: string;
  position?: number;
  price?: number;
  role?: number;
  session?: string;
  therapy?: string;
  username?: string;
  specialty?: {
    _id: string;
    name: string;
    slug: string;
    description: string;
    updated_at?: string;
    created_at?: string;
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
  };
}
interface IGetListDoctorRes {
  message: string;
  data: IDoctorBody[];
  meta: IMetaData;
}
interface IGetDoctorRes {
  message: string;
  data: IDoctorBody;
}
interface ICreateDoctorBody {
  doctor_id?: string;
  hospital_id?: string;
  specialty_id?: string;
  description?: string;
  therapy?: string;
  price?: number;
  session?: string;
}
interface IUpdateDoctorBody {
  id: string;
  body: ICreateDoctorBody;
}
const path = {
  root: "/doctors",
  create: "/doctors/create",
  update: "/doctors/update",
  delete: "/doctors/delete",
};

const getListDoctor = (params: IParamsDoctor) => {
  return http.get<IGetListDoctorRes>(path.root, {
    params: params as CommonParams<IParamsDoctor>,
  });
};

const getDoctorById = (id: string) => {
  return http.get<IGetDoctorRes>(`${path.root}/${id}`);
};

const createDoctor = (data: ICreateDoctorBody) => {
  return http.post<{message: string}>(path.create, data);
};

const updateDoctor = ({id, body}: IUpdateDoctorBody) => {
  return http.patch<any>(`${path.update}/${id}`, body);
};

const deleteDoctor = (id: string) => {
  return http.delete<any>(`${path.delete}/${id}`);
};
export default {
  getListDoctor,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
