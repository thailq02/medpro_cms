import {TablePaginationConfig} from "antd";
import {Dispatch, SetStateAction, useState} from "react";

interface IParamsDefaultCommon {
  page: number;
  limit: number;
}
export const paramsDefaultCommon: IParamsDefaultCommon = {
  page: 1,
  limit: 5,
};
type StateHook<T extends Record<any, any>> = {
  params: T;
  setParams: Dispatch<SetStateAction<T>>;
  handleChangePagination: (value: TablePaginationConfig) => void;
};

function useSearchParams<T extends Record<any, any>>(
  paramsDefault: T,
): StateHook<T> {
  const [params, setParams] = useState<T>(paramsDefault);
  const handleChangePagination = (value: TablePaginationConfig) => {
    setParams({
      ...params,
      page: value.current as number,
      limit: value.pageSize as number,
    });
  };
  return {params, setParams, handleChangePagination};
}

export default useSearchParams;
