import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./itemsSlice";
import fetchStatusSlice from "./fetchStatus";
import uiStatusSlice from "./uiStatusSlice";

const itemsStore = configureStore({
  reducer: {
    items: itemsSlice.reducer,
    fetchStatus: fetchStatusSlice.reducer,
    uiStatus: uiStatusSlice.reducer,
  },
});

export default itemsStore;
