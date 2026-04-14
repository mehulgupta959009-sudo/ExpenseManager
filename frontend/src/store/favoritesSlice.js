import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { status: true, currentlyFetchingFavs: false, items: [] },
  reducers: {
    // addFavorite: (state, action) => {
    //   const checker = state.items.find(
    //     (item) => item._id === action.payload.id,
    //   );
    //   if (checker) {
    //     console.log("Item already in favorites:", action.payload.id);
    //     return state;
    //   }
    //   state.items.push(action.payload);
    // },
    deleteFavorite: (state, action) => {
      console.log("Removing item with ID:", action.payload);
      state.items = state.items.filter((item) => item._id !== action.payload);
    },

    markFetching: (state) => {
      state.currentlyFetchingFavs = true;
    },
    markFetchedDone: (state) => {
      state.currentlyFetchingFavs = false;
    },
    markStatusChanged: (state) => {
      state.status = !state.status;
    },

    fetchedFavItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const favoritesActions = favoritesSlice.actions;
export default favoritesSlice;
