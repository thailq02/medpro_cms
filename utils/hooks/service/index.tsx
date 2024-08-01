import ApiService, {IParamsService} from "@/apiRequest/ApiService";
import QUERY_KEY from "@/config/QUERY_KEY";
import {useMutation, useQuery} from "@tanstack/react-query";
import {notification} from "antd";

const useQueryGetListService = (params: IParamsService) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_LIST_SERVICE, params],
    queryFn: async () => await ApiService.getListService(params),
  });
};

const useQueryGetServiceById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_SERVICE_BY_ID, id],
    queryFn: async () => await ApiService.getServiceById(id),
    enabled: !!id,
  });
};

const useCreateService = () => {
  return useMutation({
    mutationFn: ApiService.createService,
    onSuccess: () => {
      notification.success({
        message: "Tạo dịch vụ thành công",
        duration: 3,
      });
    },
  });
};

const useUpdateService = () => {
  return useMutation({
    mutationFn: ApiService.updateService,
    onSuccess: () => {
      notification.success({
        message: "Cập nhật dịch vụ thành công",
        duration: 3,
      });
    },
  });
};

const useDeleteService = () => {
  return useMutation({
    mutationFn: ApiService.deleteService,
    onSuccess: () => {
      notification.success({
        message: "Xóa dịch vụ thành công",
        duration: 3,
      });
    },
  });
};

export {
  useCreateService,
  useDeleteService,
  useQueryGetListService,
  useQueryGetServiceById,
  useUpdateService,
};
