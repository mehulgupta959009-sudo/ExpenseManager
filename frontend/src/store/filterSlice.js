import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    timePeriod: "all", // all, daily, weekly, monthly
    transactionType: "both", // both, expense, earning
    selectedDate: new Date().toISOString().split("T")[0],
  },
  reducers: {
    setTimePeriod: (state, action) => {
      state.timePeriod = action.payload;
    },
    setTransactionType: (state, action) => {
      state.transactionType = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    resetFilters: (state) => {
      state.timePeriod = "all";
      state.transactionType = "both";
      state.selectedDate = new Date().toISOString().split("T")[0];
    },
  },
});

export const filterActions = filterSlice.actions;
export default filterSlice;
