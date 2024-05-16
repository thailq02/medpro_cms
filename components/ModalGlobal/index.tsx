import React, {CSSProperties, isValidElement} from "react";
import {Modal} from "antd";
import store, {useAppSelector} from "@/redux/store";
import {
  setContentModal,
  setOptionModal,
  useCloseModal,
} from "@/redux/slices/ModalSlice";
import "./index.scss";
import {useWindowDimensions} from "@/utils/layout/get-window";

interface IModalGlobalProps {
  content: React.JSX.Element;
  options: {
    title: string;
    classNames?: string;
    widthModal?: string | number;
    subtractHeight?: number;
    bodyStyle?: CSSProperties;
  };
}

export function addModal({content, options}: IModalGlobalProps) {
  store.dispatch(setContentModal(content));
  store.dispatch(setOptionModal(options));
}

export default function ModalGlobal() {
  const {optionModal, contentModal} = useAppSelector((state) => state.modal);
  const {title, classNames, widthModal, subtractHeight, bodyStyle} =
    optionModal;
  const closeModal = useCloseModal();
  const {height} = useWindowDimensions();

  return isValidElement(contentModal) ? (
    <Modal
      title={title}
      open
      className={`ant-modal-global ${classNames}`}
      width={widthModal}
      style={{
        ...bodyStyle,
        height: subtractHeight ? height - subtractHeight : undefined,
        overflowY: "scroll",
      }}
      onCancel={closeModal}
      centered
      footer={null}
    >
      {contentModal}
    </Modal>
  ) : (
    <div />
  );
}
