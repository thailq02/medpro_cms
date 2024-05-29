import React, {Dispatch, SetStateAction} from "react";
import {Select, SelectProps} from "antd";

interface IFilterGlobalProps<T> extends SelectProps {
   params: T;
   filterField: string;
   handleChange: Dispatch<SetStateAction<T>>;
}

/**
 handleChange({
  ...params,
  filter: JSON.stringify({
    ...(params.filter ? JSON.parse(params.filter) : undefined),
    [filterField]: e,
  }),
})
=> khi truyền vào filterField là "role" thì params.filter sẽ được thêm key "role" với giá trị e => {page: 1, limit: 5, search: '', filter: '{"role":1}'}
 */
export function InputFilterGlobal(
   props: IFilterGlobalProps<any>,
): React.JSX.Element {
   const {handleChange, filterField, params} = props;
   return (
      <Select
         onChange={(e) =>
            handleChange({
               ...params,
               [filterField]: e,
            })
         }
         allowClear
         className="min-w-[180px] w-full"
         filterOption={(inputValue, option): boolean =>
            String(option?.label)
               ?.toLowerCase()
               ?.includes(inputValue.toLowerCase())
         }
         {...props}
      />
   );
}
