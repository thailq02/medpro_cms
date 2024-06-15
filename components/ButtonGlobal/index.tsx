import {
  CheckOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  LockOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {Button, Modal, Tooltip} from "antd";

interface IPropsButton {
  title: string;
  loading?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export enum EButtonAction {
  COPY = "copy",
  EDIT = "edit",
  DELETE = "delete",
  PASSWORD = "password",
  CONFIRM = "confirm",
}

interface IActionButton {
  titleTooltipCopy?: string;
  type: EButtonAction;
  onClick: () => void;
}

export function ActionButton({
  type,
  onClick,
  titleTooltipCopy,
}: IActionButton): JSX.Element {
  let renderButton;
  const iconSize = " text-[20px]";
  switch (type) {
    case EButtonAction.COPY:
      renderButton = (
        <Tooltip title={titleTooltipCopy}>
          <CopyOutlined
            className={"text-blue-600" + iconSize}
            onClick={onClick}
          />
        </Tooltip>
      );
      break;
    case EButtonAction.EDIT:
      renderButton = (
        <EditOutlined
          onClick={onClick}
          className={"text-green-600" + iconSize}
        />
      );
      break;
    case EButtonAction.PASSWORD:
      renderButton = (
        <LockOutlined
          onClick={onClick}
          className={"text-blue-600" + iconSize}
        />
      );
      break;
    case EButtonAction.DELETE:
      renderButton = (
        <DeleteOutlined
          onClick={() => {
            Modal.confirm({
              title: "Xác nhận",
              content: "Bạn có chắc chắn muốn xoá mục này",
              onOk: onClick,
              okButtonProps: {danger: true},
              okText: "Xác nhận",
              cancelText: "Đóng",
            });
          }}
          className={"text-red-600" + iconSize}
        />
      );
      break;
    case EButtonAction.CONFIRM:
      renderButton = (
        <CheckOutlined
          onClick={() => {
            Modal.confirm({
              title: "Xác nhận",
              content: "Xác nhận lịch đặt khám này",
              onOk: onClick,
              okButtonProps: {danger: true},
              okText: "Xác nhận",
              cancelText: "Đóng",
            });
          }}
          className={"text-green-600" + iconSize}
        />
      );
      break;
  }
  return renderButton;
}

function ButtonAdd({title, loading, onClick, disabled}: IPropsButton) {
  return (
    <Button
      disabled={disabled}
      icon={<PlusOutlined />}
      className="bg-blue-600 text-white hover:bg-blue-700 flex items-center hover:!text-white w-full"
      loading={loading}
      onClick={onClick}
    >
      {title}
    </Button>
  );
}

function ButtonDelete({title, loading, onClick, disabled}: IPropsButton) {
  return (
    <Button
      disabled={disabled}
      icon={<DeleteOutlined />}
      className="bg-red-600 text-white hover:bg-red-700 flex items-center hover:!text-white w-full"
      loading={loading}
      onClick={() => {
        Modal.confirm({
          title: "Xác nhận",
          content: "Bạn có chắc chắn muốn xoá các mục đã chọn",
          onOk: onClick,
          okButtonProps: {danger: true},
          okText: "Xoá",
          cancelText: "Huỷ",
        });
      }}
    >
      {title}
    </Button>
  );
}

export {ButtonAdd, ButtonDelete};
