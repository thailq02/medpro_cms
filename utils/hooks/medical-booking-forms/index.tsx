import QUERY_KEY from "@/config/QUERY_KEY";
import {useMutation, useQuery} from "@tanstack/react-query";
import ApiMedicalBookingForms, {
  IParamsMedicalBookingForms,
} from "@/apiRequest/ApiMedicalBookingForms";
import {notification} from "antd";

const useQueryGetListMedicalBookingForms = (
  params?: IParamsMedicalBookingForms,
) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_LIST_MEDICAL_BOOKING_FORMS, params],
    queryFn: async () =>
      await ApiMedicalBookingForms.getListMedicalBookingForms(params),
  });
};

const useQueryGetMedicalBookingFormsById = (id?: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_MEDICAL_BOOKING_FORMS_BY_ID, id],
    queryFn: async () =>
      await ApiMedicalBookingForms.getMedicalBookingFormsById(id as string),
    enabled: !!id,
  });
};

const useCreateMedicalBookingForms = () => {
  return useMutation({
    mutationFn: ApiMedicalBookingForms.createMedicalBookingForms,
    onSuccess: () => {
      notification.success({
        message: "Tạo hình thức đặt khám thành công",
        duration: 3,
      });
    },
  });
};

const useUpdateMedicalBookingForms = () => {
  return useMutation({
    mutationFn: ApiMedicalBookingForms.updateMedicalBookingForms,
    onSuccess: () => {
      notification.success({
        message: "Cập nhật hình thức đặt khám thành công",
        duration: 3,
      });
    },
  });
};

const useDeleteMedicalBookingForms = () => {
  return useMutation({
    mutationFn: ApiMedicalBookingForms.deleteMedicalBookingForms,
    onSuccess: () => {
      notification.success({
        message: "Xóa hình thức đặt khám thành công",
        duration: 3,
      });
    },
  });
};
export {
  useQueryGetListMedicalBookingForms,
  useCreateMedicalBookingForms,
  useUpdateMedicalBookingForms,
  useQueryGetMedicalBookingFormsById,
  useDeleteMedicalBookingForms,
};
