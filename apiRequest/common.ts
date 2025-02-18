export const AT_COOKIE_NAME = "accessToken";
export const RT_COOKIE_NAME = "refreshToken";
export interface ICommonAuditable {
  key?: number | string;
  created_at?: string;
  updated_at?: string;
}
export type NonNullableFields<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export type ParamsType = Record<
  string,
  string | number | boolean | string[] | number[] | boolean[]
>;

export type CommonParams<T> = Record<
  keyof T,
  string | number | boolean | string[] | number[] | boolean[]
>;

export interface IMetaData {
  total_page?: number;
  limit?: number;
  current_page?: number;
  total_items?: number;
}

export enum IStatus {
  SUCCESS = 200,
  ERROR = 400,
  UNAUTHORIZED = 401,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}

export const QUERY_PARAMS = {page: 1, limit: 99};
