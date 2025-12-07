import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: {
            _id: "",
            name: "Demo",
            email: "demo@email.com",
            accessToken: null
        }
    },
    reducers: {
        addUserInfo: (state, action) => {
            state.userInfo = action?.payload
        },
        addAccessToken: (state, action) => {
            state.userInfo.accessToken = action?.payload
        },
        removeAccessToken: (state) => {
            state.userInfo.accessToken = null
        }
    }
})

export const { addUserInfo, addAccessToken, removeAccessToken } = userSlice.actions;

export default userSlice.reducer;


// Async action creator using Redux Thunk
export const fetchUserCart = (userId) => async (dispatch) => {
    try {
        const response = await fetch(`${GET_CART_ITEMS}${userId}`);
        const data = await response.json();

        if (data.success) {
            // Dispatch an action to set the cart items in the Redux state
            dispatch(setCartItems(data.cartItems)); // Adjust based on your actual response structure
        } else {
            console.log("Fetch unsuccessful:", data.error); // Handle error as needed
        }
    } catch (error) {
        console.error("Error fetching cart items:", error);
    }
};