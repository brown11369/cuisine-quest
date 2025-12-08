import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    pushToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item._id === newItem._id);

      state.totalQuantity++;
      state.totalPrice += newItem?.product?.price;

      if (!existingItem) {
        state.items.push(newItem);
      }
    },

    addItem: (state, action) => {
      state.items = action.payload.cartData;
      state.totalQuantity = action.payload.totalItems;
      state.totalPrice = action.payload.totalPrice;
    },

    increment: (state, action) => {
      const itemToUpdate = state.items.find(
        (item) => item._id === action.payload._id,
      );

      if (itemToUpdate) {
        itemToUpdate.quantity++;
        state.totalQuantity++;
        state.totalPrice += action.payload.product.price;
      } else {
        console.warn("Item not found with _id:", action.payload);
      }
    },

    decrement: (state, action) => {
      const itemToUpdate = state.items.find(
        (item) => item._id === action.payload._id,
      );

      if (itemToUpdate) {
        if (itemToUpdate.quantity > 1) {
          itemToUpdate.quantity--;
          state.totalQuantity--;
          state.totalPrice -= action.payload.product.price;
        }
      } else {
        console.warn("Item not found with _id:", action.payload);
      }
    },

    removeItem: (state, action) => {
      console.log(action.payload);
      const itemIndex = state.items.findIndex(
        (item) => item._id === action.payload._id,
      );

      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);
        state.totalQuantity -= action.payload.quantity;
        state.totalPrice -=
          action.payload.quantity * action.payload.product.price;
      } else {
        console.warn("Item not found with _id:", action.payload);
      }
    },
    clearCart: (state, action) => {
      state.items = [];
    },
  },
});

export const {
  pushToCart,
  addItem,
  increment,
  decrement,
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
