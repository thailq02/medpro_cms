import ApiDoctor, {IParamsDoctor} from "@/apiRequest/ApiDoctor";
import QUERY_KEY from "@/config/QUERY_KEY";
import {useMutation, useQuery} from "@tanstack/react-query";
import {notification} from "antd";

const useQueryGetListDoctor = (params: IParamsDoctor) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_LIST_DOCTOR, params],
    queryFn: async () => await ApiDoctor.getListDoctor(params),
  });
};

const useQueryGetDoctorById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_DOCTOR_BY_ID, id],
    queryFn: async () => await ApiDoctor.getDoctorById(id),
    enabled: !!id,
  });
};

const useCreateDoctor = () => {
  return useMutation({
    mutationFn: ApiDoctor.createDoctor,
    onSuccess: () => {
      notification.success({
        message: "Tạo bác sĩ thành công",
        duration: 3,
      });
    },
  });
};

const useUpdateDoctor = () => {
  return useMutation({
    mutationFn: ApiDoctor.updateDoctor,
    onSuccess: () => {
      notification.success({
        message: "Cập nhật bác sĩ thành công",
        duration: 3,
      });
    },
  });
};

const useDeleteDoctor = () => {
  return useMutation({
    mutationFn: ApiDoctor.deleteDoctor,
    onSuccess: () => {
      notification.success({
        message: "Xóa bác sĩ thành công",
        duration: 3,
      });
    },
  });
};
export {
  useCreateDoctor,
  useDeleteDoctor,
  useQueryGetDoctorById,
  useQueryGetListDoctor,
  useUpdateDoctor,
};
