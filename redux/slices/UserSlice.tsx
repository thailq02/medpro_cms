import {IAccountInfo} from "@/types";
import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState: IAccountInfo = {};

export const UserSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loginUser: (_, action: PayloadAction<IAccountInfo>) => {
      return action.payload;
    },
    logoutUser: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {loginUser, logoutUser} = UserSlice.actions;
export default UserSlice.reducer;
