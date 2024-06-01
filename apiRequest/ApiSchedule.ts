import {CommonParams, ICommonAuditable, IMetaData} from "@/apiRequest/common";
import http from "@/apiRequest/http";

export interface IScheduleBody extends ICommonAuditable {
  _id?: string;
  doctor_id?: string;
  date?: string;
  time_type?: string[];
}

export interface IParamsSchedule {
  limit: number;
  page: number;
  doctor_id?: string;
  date?: string;
}

export type IParamsScheduleByDoctorID = Omit<IParamsSchedule, "doctor_id">;

const path = {
  root: "/schedules",
  create: "/schedules/create",
  update: "/schedules/update",
  delete: "/schedules/delete",
  get_schedule_by_doctor_id: "/schedules/doctor",
};

interface IGetListScheduleResponse {
  data: IScheduleBody[];
  message: string;
  meta: IMetaData;
}

interface IGetScheduleResponse {
  data: IScheduleBody;
  message: string;
}

interface ICreateScheduleBody {
  doctor_id?: string;
  date?: string;
  time_type?: string[];
}
interface IUpdateScheduleBody {
  id: string;
  body: ICreateScheduleBody;
}
const getListSchedule = (params: IParamsSchedule) => {
  return http.get<IGetListScheduleResponse>(path.root, {
    params: params as CommonParams<IParamsSchedule>,
  });
};

const getScheduleById = (id: string) => {
  return http.get<IGetScheduleResponse>(`${path.root}/${id}`);
};

const createSchedule = (data: ICreateScheduleBody) => {
  return http.post<{message: string}>(path.create, data);
};

const updateSchedule = (data: IUpdateScheduleBody) => {
  return http.patch<IGetScheduleResponse>(
    `${path.update}/${data.id}`,
    data.body,
  );
};

const deleteSchedule = (id: string) => {
  return http.delete<IGetScheduleResponse>(`${path.delete}/${id}`);
};

const getListScheduleByDoctorId = ({
  doctor_id,
  params,
}: {
  doctor_id: string;
  params: IParamsScheduleByDoctorID;
}) => {
  return http.get<IGetListScheduleResponse>(
    `${path.get_schedule_by_doctor_id}/${doctor_id}`,
    {params: params as CommonParams<IParamsScheduleByDoctorID>},
  );
};

export default {
  getListSchedule,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getListScheduleByDoctorId,
};
