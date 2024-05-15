import React, {isValidElement} from "react";
import {Modal} from "antd";
import store, {useAppSelector} from "@/redux/store";
import {
  setContentModal,
  setOptionModal,
  useCloseModal,
} from "@/redux/slices/ModalSlice";
import "./index.scss";

interface IModalGlobalProps {
  content: React.JSX.Element;
  options: {title: string; classNames?: string; widthModal?: string | number};
}

export function addModal({content, options}: IModalGlobalProps) {
  store.dispatch(setContentModal(content));
  store.dispatch(setOptionModal(options));
}

export default function ModalGlobal() {
  const {optionModal, contentModal} = useAppSelector((state) => state.modal);
  const {title, classNames, widthModal} = optionModal;
  const closeModal = useCloseModal();
  return isValidElement(contentModal) ? (
    <Modal
      title={title}
      open
      className={`ant-modal-global ${classNames}`}
      width={widthModal}
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
