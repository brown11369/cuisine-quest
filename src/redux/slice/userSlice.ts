import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {
      _id: "",
      name: "Demo",
      email: "demo@email.com",
      accessToken: null,
    },
  },
  reducers: {
    addUserInfo: (state, action) => {
      state.userInfo = action?.payload;
    },
    addAccessToken: (state, action) => {
      state.userInfo.accessToken = action?.payload;
    },
    removeAccessToken: (state) => {
      state.userInfo.accessToken = null;
    },
  },
});

export const { addUserInfo, addAccessToken, removeAccessToken } =
  userSlice.actions;

export default userSlice.reducer;
