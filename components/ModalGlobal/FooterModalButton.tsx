import React from "react";
import {useCloseModal} from "@/redux/slices/ModalSlice";
import {Button, Space} from "antd";

interface FooterModalProps {
  onOk: () => void;
  isLoading: boolean;
  isEdit?: boolean;
  textOk?: string;
  className?: string;
}

export function FooterModalButton({
  onOk,
  isLoading,
  isEdit,
  textOk,
  className = "",
}: FooterModalProps): JSX.Element {
  const closeModal = useCloseModal();
  return (
    <div className={`flex justify-end ${className}`}>
      <Space>
        <Button
          htmlType="submit"
          className="bg-blue-600 text-white hover:bg-blue-700 hover:!text-white"
          loading={isLoading}
          onClick={onOk}
        >
          {textOk ?? (isEdit ? "Sửa" : "Thêm")}
        </Button>
        <Button type="default" onClick={closeModal}>
          Đóng
        </Button>
      </Space>
    </div>
  );
}
