import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./itemsSlice";
import fetchStatusSlice from "./fetchStatus";
import favoritesSlice from "./favoritesSlice";
import uiStatusSlice from "./uiStatusSlice";

const itemsStore = configureStore({
  reducer: {
    items: itemsSlice.reducer,
    fetchStatus: fetchStatusSlice.reducer,
    favorites: favoritesSlice.reducer,
    uiStatus: uiStatusSlice.reducer,
  },
});

export default itemsStore;
