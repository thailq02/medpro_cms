import React from "react";
import "./index.scss";
import {Modal} from "antd";

interface IModalConfirmCustomProps {
  title: string;
  content?: string;
  handleOke?: () => void;
  handleCancel?: () => void;
}

export default function ModalConfirmCustom({
  title,
  content,
  handleCancel,
  handleOke,
}: IModalConfirmCustomProps) {
  return Modal.confirm({
    title: title,
    content: content,
    cancelText: "Hủy",
    okText: "Xác nhận",
    onOk: handleOke,
    onCancel: handleCancel,
    className: "modal-confirm-custom",
  });
}
