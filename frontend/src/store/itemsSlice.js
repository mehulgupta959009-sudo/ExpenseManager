import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    fetchingitems: (state, action) => {
      return (state = [...action.payload]);
    },
    removeitem: (state, action) => {
      return state.filter((item) => item._id !== action.payload);
    },
  },
});

export const itemsActions = itemsSlice.actions;
export default itemsSlice;
