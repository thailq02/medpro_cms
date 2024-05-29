"use client";
import * as Yup from "yup";
import {Schema} from "yup";

export interface ICreateScheduleForm {
   hospital_id?: string;
   doctor_id: string;
   date: string;
   time_type: string[];
}

export function getValidationCreateScheduleSchema(): Schema<ICreateScheduleForm> {
   return Yup.object().shape({
      doctor_id: Yup.string().required("Vui lòng chọn bác sĩ"),
      date: Yup.string().required("Vui lòng chọn ngày làm việc"),
      time_type: Yup.array()
         .of(Yup.string().required("Vui lòng chọn ca làm việc"))
         .required("Vui lòng chọn ca làm việc"),
   });
}
