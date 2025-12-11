import type { IProduct } from "@/types/products";
import type { IRestaurant } from "@/types/restaurant";
import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
  restaurantInfo: IRestaurant;
  restaurantProducts: IProduct[];
}

const initialState: InitialStateType = {
  restaurantInfo: {
    _id: "",
    name: "",
    email: "",
    accessToken: null,
  },
  restaurantProducts: [],
};
const restaurantSllice = createSlice({
  name: "restaurant",
  initialState,
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
