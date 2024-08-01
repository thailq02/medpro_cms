import ApiHospital, {IParamsHospital} from "@/apiRequest/ApiHospital";
import QUERY_KEY from "@/config/QUERY_KEY";
import {useMutation, useQuery} from "@tanstack/react-query";
import {notification} from "antd";

const useQueryGetListHospital = (params: IParamsHospital) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_LIST_HOSPITAL, params],
    queryFn: async () => await ApiHospital.getListHospital(params),
  });
};
const useQueryGetHospitalById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_HOSPITAL_BY_ID, id],
    queryFn: async () => await ApiHospital.getHospitalById(id),
    enabled: !!id,
  });
};
const useCreateHospital = () => {
  return useMutation({
    mutationFn: ApiHospital.createHospital,
    onSuccess: () => {
      notification.success({
        message: "Tạo bệnh viện thành công",
        duration: 3,
      });
    },
  });
};
const useUpdateHospital = () => {
  return useMutation({
    mutationFn: ApiHospital.updateHospital,
    onSuccess: () => {
      notification.success({
        message: "Sửa bệnh viện thành công",
        duration: 3,
      });
    },
  });
};
export {
  useCreateHospital,
  useQueryGetHospitalById,
  useQueryGetListHospital,
  useUpdateHospital,
};
