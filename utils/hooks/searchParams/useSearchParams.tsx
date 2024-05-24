import {TablePaginationConfig} from "antd";
import {Dispatch, SetStateAction, useEffect, useState} from "react";

interface IParamsDefaultCommon {
  page: number;
  limit: number;
  search?: string;
}
export const paramsDefaultCommon: IParamsDefaultCommon = {
  page: 1,
  limit: 5,
  search: "",
};
type StateHook<T extends Record<any, any>> = {
  params: T;
  searchValue: string;
  setParams: Dispatch<SetStateAction<T>>;
  setSearchValue: Dispatch<SetStateAction<string>>;
  handleChangePagination: (value: TablePaginationConfig) => void;
};

function useSearchParams<T extends Record<any, any>>(
  paramsDefault: T,
): StateHook<T> {
  const [params, setParams] = useState<T>(paramsDefault);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    setParams({
      ...params,
      search: searchValue,
    });
  }, [searchValue]);

  const handleChangePagination = (value: TablePaginationConfig) => {
    setParams({
      ...params,
      page: value.current as number,
      limit: value.pageSize as number,
    });
  };
  return {
    params,
    setParams,
    handleChangePagination,
    searchValue,
    setSearchValue,
  };
}

export default useSearchParams;
