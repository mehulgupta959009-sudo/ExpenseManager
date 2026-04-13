import { createSlice } from "@reduxjs/toolkit";

const uiStatusSlice = createSlice({
  name: "uiStatus",
  initialState: { sideBar: true },
  reducers: {
    hideSideBar: (state) => {
      state.sideBar = !state.sideBar;
    },
  },
});

export const uiStatusActions = uiStatusSlice.actions;
export default uiStatusSlice;
