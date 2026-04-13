import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./itemsSlice";
import fetchStatusSlice from "./fetchStatus";
import uiStatusSlice from "./uiStatusSlice";
import filterSlice from "./filterSlice";

const itemsStore = configureStore({
  reducer: {
    items: itemsSlice.reducer,
    fetchStatus: fetchStatusSlice.reducer,
    uiStatus: uiStatusSlice.reducer,
    filters: filterSlice.reducer,
  },
});

export default itemsStore;
