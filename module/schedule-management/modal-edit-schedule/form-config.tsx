"use client";
import * as Yup from "yup";
import {Schema} from "yup";

export interface IEditScheduleForm {
  doctor_id: string;
  current_number?: number;
  max_number: number;
  date: string;
  time_type: string[];
}

export function getValidationEditScheduleSchema(): Schema<IEditScheduleForm> {
  return Yup.object().shape({
    doctor_id: Yup.string().required("Vui lòng chọn bác sĩ"),
    current_number: Yup.number(),
    max_number: Yup.number().required("Vui lòng nhập số bệnh nhân tối đa"),
    date: Yup.string().required("Vui lòng chọn ngày làm việc"),
    time_type: Yup.array()
      .of(Yup.string().required("Vui lòng chọn ca làm việc"))
      .required("Vui lòng chọn ca làm việc"),
  });
}
