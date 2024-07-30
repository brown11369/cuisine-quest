import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./slice/userSlice";
import cartSlice from "./slice/cartSlice";
import productSlice from "./slice/productSlice";
import restaurantSlice from "./slice/restaurantSlice";

const store = configureStore({
    reducer: {
        product: productSlice,
        user: userSlice,
        cart: cartSlice,
        restaurant: restaurantSlice,
    },
})

export default store;