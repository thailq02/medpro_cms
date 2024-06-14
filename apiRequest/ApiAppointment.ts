import {ICommonAuditable} from "@/apiRequest/common";
import http from "@/apiRequest/http";

export interface IAppointmentBody extends ICommonAuditable {
  _id?: string;
  doctor_id?: string;
  patient_id?: string;
  service_id?: string;
  doctor?: {
    _id?: string;
    address?: string;
    avatar?: string;
    description?: string;
    doctor_id?: string;
    email?: string;
    gender?: number;
    hospital_id?: string;
    name?: string;
    phone_number?: string;
    position?: number;
    price?: number;
    role?: number;
    session?: string;
    specialty_id?: string;
    therapy?: string;
    username?: string;
    date_of_birth?: string;
    created_at?: string;
    updated_at?: string;
  };
  service?: {
    _id?: string;
    description?: string;
    hospital_id?: string;
    name?: string;
    note?: string;
    price?: number;
    session?: string;
    specialty_id?: string;
    type?: string;
    created_at?: string;
    updated_at?: string;
  };
  status?: boolean;
  email?: string;
  fullname?: string;
  gender?: number;
  date_of_birth?: string;
  price?: number;
  reason?: string;
  isPayment?: boolean;
  date?: string;
  time?: string;
  address?: string;
}

export interface IGetFullAppointmentsRes {
  message: string;
  data: IAppointmentBody[];
}
const path = {
  root: "appointments",
  delete: "appointments/delete",
};

const apiAppointment = {
  getFullAppointments: () => http.get<IGetFullAppointmentsRes>(path.root),
  deleteAppointment: (id: string) => http.delete(`${path.delete}/${id}`),
};

export default apiAppointment;
