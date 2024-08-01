import {Table, TablePaginationConfig, TableProps} from "antd";
import CONFIG from "config";
import "./index.scss";

interface ITableGlobalProps extends TableProps<any> {
  total?: number;
  setPagination?: () => void;
  scrollX?: number;
  className?: string;
}

const renderPagination: TablePaginationConfig = {
  defaultPageSize: 20,
  total: 0,
  showSizeChanger: true,
  pageSizeOptions: ["10", "20", "50", "100"],
  showQuickJumper: true,
};

export default function TableGlobal(props: ITableGlobalProps): JSX.Element {
  const {scrollX, rowSelection} = props;
  return (
    <Table
      className={`ant-table-global ${props.className}`}
      scroll={{
        scrollToFirstRowOnChange: true,
        x: scrollX ?? CONFIG.LAYOUT_CONFIG.tableWidth,
        y: CONFIG.LAYOUT_CONFIG.tableHeight,
      }}
      rowSelection={
        rowSelection
          ? {
              ...rowSelection,
              type: "checkbox",
              columnWidth: 50,
              fixed: "left",
            }
          : undefined
      }
      pagination={renderPagination}
      size="middle"
      bordered
      {...props}
    />
  );
}
