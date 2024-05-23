import {IParamsSpecialty} from "@/apiRequest/ApiSpecialty";
import QUERY_KEY from "@/config/QUERY_KEY";
import {useMutation, useQuery} from "@tanstack/react-query";
import ApiSpecialty from "@/apiRequest/ApiSpecialty";
import {notification} from "antd";

const useQueryGetListSpecialty = (params: IParamsSpecialty) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_LIST_SPECIALTY, params],
    queryFn: async () => await ApiSpecialty.getListSpecialty(params),
  });
};

const useQueryGetSpecialtyById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_SPECIALTY_BY_ID, id],
    queryFn: async () => await ApiSpecialty.getSpecialtyById(id),
    enabled: !!id,
  });
};

const useCreateSpecialty = () => {
  return useMutation({
    mutationFn: ApiSpecialty.createSpecialty,
    onSuccess: () => {
      notification.success({
        message: "Thêm chuyên khoa thành công",
        duration: 3,
      });
    },
  });
};

const useUpdateSpecialty = () => {
  return useMutation({
    mutationFn: ApiSpecialty.updateSpecialty,
    onSuccess: () => {
      notification.success({
        message: "Cập nhật chuyên khoa thành công",
        duration: 3,
      });
    },
  });
};

const useDeleteSpecialty = () => {
  return useMutation({
    mutationFn: ApiSpecialty.deleteSpecialty,
    onSuccess: () => {
      notification.success({
        message: "Xóa chuyên khoa thành công",
        duration: 3,
      });
    },
  });
};

export {
  useQueryGetListSpecialty,
  useCreateSpecialty,
  useQueryGetSpecialtyById,
  useUpdateSpecialty,
  useDeleteSpecialty,
};
