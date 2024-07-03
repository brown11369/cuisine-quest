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
            const existingItem = state.items.find(item => item._id === newItem._id);

            state.totalQuantity++;
            state.totalPrice += newItem?.product?.price;

            if (!existingItem) {
                state.items.push(newItem);
            }
        },
        addItem: (state, action) => {
            state.items = action.payload.cartData;
            state.totalQuantity=action.payload.totalItems;
            state.totalPrice=action.payload.totalPrice;
        },
        increment: (state, action) => {
            // const newItem = action.payload;
            // const lol=state.items.find(item => {
            //     console.log(item)
            // });
            // const index = action.payload;
            const existingItem = state.items.find(item => item._id === action.payload.id);
            console.log(existingItem)
            // state.items[index].quantity++;
        },
        decrement: (state, action) => {
            const index = action.payload;
            state.items[index].quantity--;
            if (state.items[index].quantity === 0) {
                state.items.splice(index, 1);  // Remove item if quantity reaches zero
            }
        },
        removeItem: (state, action) => {
            state.items.pop()
        },
        clearCart: (state, action) => {
            state.items = []
        }
    }
})

export const { pushToCart, addItem, increment, decrement, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;