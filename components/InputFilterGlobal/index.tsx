import React, {Dispatch, SetStateAction} from "react";
import {Select, SelectProps} from "antd";

interface IFilterGlobalProps<T> extends SelectProps {
  params: T;
  filterField: string;
  handleChange: Dispatch<SetStateAction<T>>;
}

export function InputFilterGlobal(
  props: IFilterGlobalProps<any>,
): React.JSX.Element {
  const {handleChange, filterField, params} = props;
  return (
    <Select
      onChange={(e) =>
        handleChange({
          ...params,
          filter: JSON.stringify({
            ...(params.filter ? JSON.parse(params.filter) : undefined),
            [filterField]: e,
          }),
        })
      }
      allowClear
      className="min-w-[180px] w-full"
      filterOption={(inputValue, option): boolean =>
        String(option?.label)?.toLowerCase()?.includes(inputValue.toLowerCase())
      }
      {...props}
    />
  );
}
