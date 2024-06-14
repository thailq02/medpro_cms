import apiAppointment, {
  IParamsAppointmentByDoctorID,
} from "@/apiRequest/ApiAppointment";
import QUERY_KEY from "@/config/QUERY_KEY";
import {useMutation, useQuery} from "@tanstack/react-query";
import {notification} from "antd";

const useQueryGetListAppointment = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_LIST_APPOINTMENT],
    queryFn: async () => await apiAppointment.getFullAppointments(),
  });
};

const useQueryGetAppointmentByDoctorId = (
  doctor_id: string,
  params: IParamsAppointmentByDoctorID,
) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_APPOINTMENT_BY_DOCTOR_ID, doctor_id, params],
    queryFn: async () =>
      await apiAppointment.getAppointmentByDoctorId({doctor_id, params}),
    enabled: !!doctor_id,
  });
};

const useDeleteAppointment = () => {
  return useMutation({
    mutationFn: apiAppointment.deleteAppointment,
    onSuccess: () => {
      notification.success({
        message: "Xóa lịch khám thành công",
        duration: 3,
      });
    },
  });
};
export {
  useDeleteAppointment,
  useQueryGetAppointmentByDoctorId,
  useQueryGetListAppointment,
};
