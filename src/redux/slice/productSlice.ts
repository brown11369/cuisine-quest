import type { IProduct } from "@/types/products";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InitialStateType {
  products: IProduct[];
}

const initialState: InitialStateType = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
