import QUERY_KEY from "@/config/QUERY_KEY";
import {useMutation, useQuery} from "@tanstack/react-query";
import ApiSchedule from "@/apiRequest/ApiSchedule";
import {notification} from "antd";

const useQueryGetListSchedule = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_LIST_SCHEDULE],
    queryFn: async () => await ApiSchedule.getListSchedule(),
  });
};

const useQueryGetScheduleById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_SCHEDULE_BY_ID, id],
    queryFn: async () => await ApiSchedule.getScheduleById(id),
    enabled: !!id,
  });
};

const useCreateSchedule = () => {
  return useMutation({
    mutationFn: ApiSchedule.createSchedule,
    onSuccess: () => {
      notification.success({
        message: "Tạo lịch trình thành công",
        duration: 3,
      });
    },
  });
};

const useUpdateSchedule = () => {
  return useMutation({
    mutationFn: ApiSchedule.updateSchedule,
    onSuccess: () => {
      notification.success({
        message: "Sửa lịch trình thành công",
        duration: 3,
      });
    },
  });
};

const useDeleteSchedule = () => {
  return useMutation({
    mutationFn: ApiSchedule.deleteSchedule,
    onSuccess: () => {
      notification.success({
        message: "Xóa lịch trình thành công",
        duration: 3,
      });
    },
  });
};

export {
  useQueryGetListSchedule,
  useQueryGetScheduleById,
  useCreateSchedule,
  useUpdateSchedule,
  useDeleteSchedule,
};
