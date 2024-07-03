import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./slice/userSlice";
import cartSlice from "./slice/cartSlice";
import productSlice from "./slice/productSlice";

const store = configureStore({
    reducer: {
        product: productSlice,
        user: userSlice,
        cart: cartSlice,
    },
})

export default store;