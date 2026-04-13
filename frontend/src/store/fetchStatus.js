import { createSlice } from "@reduxjs/toolkit";

const fetchStatusSlice = createSlice({
  name: "fetchStatus",
  initialState: { status: false, currentlyFetching: false }, // Remove the brackets
  reducers: {
    markFetching: (state) => {
      state.currentlyFetching = true;
    },
    markFetchedDone: (state) => {
      state.currentlyFetching = false;
    },
    markStatusChanged: (state) => {
      state.status = !state.status;
    },
  },
});

export const fetchStatusActions = fetchStatusSlice.actions;
export default fetchStatusSlice;
