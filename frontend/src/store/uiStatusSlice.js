import { createSlice } from "@reduxjs/toolkit";

const uiStatusSlice = createSlice({
  name: "uiStatus",
  initialState: { sideBar: false, login: false },
  reducers: {
    hideSideBar: (state) => {
      state.sideBar = !state.sideBar;
    },
    Loggedout: (state) => {
      state.login = false;
    },
    Loggedin: (state) => {
      state.login = true;
    },
  },
});

export const uiStatusActions = uiStatusSlice.actions;
export default uiStatusSlice;
