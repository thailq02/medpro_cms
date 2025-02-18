import apiAppointment, {
  IParamsAppointment,
  IParamsAppointmentByDoctorID,
} from "@/apiRequest/ApiAppointment";
import QUERY_KEY from "@/config/QUERY_KEY";
import {useMutation, useQuery} from "@tanstack/react-query";
import {notification} from "antd";

const useQueryGetListAppointment = (params: IParamsAppointment) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_LIST_APPOINTMENT, params],
    queryFn: async () => await apiAppointment.getFullAppointments(params),
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

const useUpdateStatusAppointment = () => {
  return useMutation({
    mutationFn: apiAppointment.updateStatusAppointment,
    onSuccess: () => {
      notification.success({
        message: "Cập nhật trạng thái thành công",
        duration: 3,
      });
    },
  });
};
export {
  useDeleteAppointment,
  useQueryGetAppointmentByDoctorId,
  useQueryGetListAppointment,
  useUpdateStatusAppointment,
};
