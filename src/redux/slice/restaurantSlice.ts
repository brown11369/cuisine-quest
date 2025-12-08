import { createSlice } from "@reduxjs/toolkit";

const restaurantSllice = createSlice({
  name: "restaurant",
  initialState: {
    restaurantInfo: {
      _id: "",
      name: "",
      email: "",
      accessToken: null,
    },
    restaurantProducts: [],
  },
  reducers: {
    addRestaurantInfo: (state, action) => {
      state.restaurantInfo = action?.payload;
    },
    addAccessToken: (state, action) => {
      state.restaurantInfo.accessToken = action?.payload;
    },
    removeAccessToken: (state) => {
      state.restaurantInfo.accessToken = null;
    },
    addRestaurantProducts: (state, action) => {
      state.restaurantProducts = action?.payload;
    },
  },
});

export const {
  addRestaurantInfo,
  addAccessToken,
  removeAccessToken,
  addRestaurantProducts,
} = restaurantSllice.actions;

export default restaurantSllice.reducer;
