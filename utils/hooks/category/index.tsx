import ApiCategory, {IParamsCategories} from "@/apiRequest/ApiCategory";
import QUERY_KEY from "@/config/QUERY_KEY";
import {useMutation, useQuery} from "@tanstack/react-query";
import {notification} from "antd";

const useQueryGetListCategory = (params: IParamsCategories) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_LIST_CATEGORY, params],
    queryFn: async () => await ApiCategory.getListCategory(params),
  });
};

const useQueryGetCategoryById = (id?: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_CATEGORY_BY_ID, id],
    queryFn: async () => await ApiCategory.getCategoryById(id),
    enabled: !!id,
  });
};

const useCreateCategory = () => {
  return useMutation({
    mutationFn: ApiCategory.createCategory,
    onSuccess: () => {
      notification.success({
        message: "Tạo danh mục thành công",
        duration: 3,
      });
    },
  });
};

const useUpdateCategory = () => {
  return useMutation({
    mutationFn: ApiCategory.updateCategory,
    onSuccess: () => {
      notification.success({
        message: "Cập nhật danh mục thành công",
        duration: 3,
      });
    },
  });
};

const useDeleteCategory = () => {
  return useMutation({
    mutationFn: ApiCategory.deleteCategory,
    onSuccess: () => {
      notification.success({
        message: "Xóa danh mục thành công",
        duration: 3,
      });
    },
  });
};
export {
  useCreateCategory,
  useDeleteCategory,
  useQueryGetCategoryById,
  useQueryGetListCategory,
  useUpdateCategory,
};
