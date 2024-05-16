import {createSlice} from "@reduxjs/toolkit";
import {CSSProperties} from "react";
import {useDispatch} from "react-redux";

interface IMenuState {
  isOpenModal: boolean;
  idItem?: number;
  contentModal?: React.JSX.Element;
  optionModal: {
    title: string;
    classNames?: string;
    widthModal?: string | number;
    subtractHeight?: number;
    bodyStyle?: CSSProperties;
  };
}

const initialState: IMenuState = {
  isOpenModal: false,
  idItem: undefined,
  contentModal: undefined,
  optionModal: {
    title: "",
    classNames: "",
    widthModal: undefined,
    subtractHeight: 0,
    bodyStyle: undefined,
  },
};

const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpenModal = true;
    },
    closeModal: (state) => {
      state.isOpenModal = false;
      state.idItem = undefined;
      state.contentModal = undefined;
    },
    setIdItem: (state, e) => {
      state.idItem = e.payload;
    },

    setContentModal: (state, e) => {
      state.contentModal = e.payload;
    },

    setOptionModal: (state, e) => {
      state.optionModal = e.payload;
    },
    // toggleMenu: (state) => {
    //   state.isOpen = !state.isOpen;
    // },
  },
});

const useOpenModal = () => {
  const dispatch = useDispatch();
  return () => {
    dispatch(openModal());
  };
};
const useCloseModal = () => {
  const dispatch = useDispatch();
  return () => {
    dispatch(closeModal());
  };
};

export {useOpenModal, useCloseModal};
// Action creators are generated for each case reducer function
export const {
  openModal,
  closeModal,
  setIdItem,
  setContentModal,
  setOptionModal,
} = ModalSlice.actions;

export default ModalSlice.reducer;
