import {CommonParams, ICommonAuditable, IMetaData} from "@/apiRequest/common";
import http from "@/apiRequest/http";
import {ICreateCategoryForm} from "@/module/category-management/modal-create-category/form-config";

export interface IParamsCategories {
  limit?: number;
  page?: number;
}
export interface ICategoryBody extends ICommonAuditable {
  _id: string;
  name: string;
  slug: string;
  parent_id: string | null;
}
export interface IGetCategoryRes {
  message: string;
  data: ICategoryBody;
}
export interface IGetListCategoryRes {
  message: string;
  data: ICategoryBody[];
  meta: IMetaData;
}
interface IUpdateBody {
  id: string;
  body: ICreateCategoryForm;
}
interface IDeleteRes {
  message: string;
  data: ICategoryBody | null;
}
const path = {
  root: "/categories",
  create: "/categories/create",
  update: "/categories/update",
  delete: "/categories/delete",
};

const getListCategory = (params?: IParamsCategories) => {
  return http.get<IGetListCategoryRes>(path.root, {
    cache: "no-cache",
    params: params as CommonParams<IParamsCategories>,
  });
};
const getCategoryById = (id?: string) => {
  return http.get<IGetCategoryRes>(`${path.root}/${id}`);
};
const createCategory = (data: ICreateCategoryForm) => {
  return http.post<{message: string}>(path.create, data);
};
const updateCategory = (data: IUpdateBody) => {
  return http.put<IGetCategoryRes>(`${path.update}/${data.id}`, data.body);
};
const deleteCategory = (id: string) => {
  return http.delete<IDeleteRes>(`${path.delete}/${id}`);
};
export default {
  getListCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
