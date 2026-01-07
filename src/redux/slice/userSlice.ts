import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  name: string;
  email: string;
  accessToken?: string | null;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = {
        _id: action.payload._id,
        name: action.payload.name,
        email: action.payload.email,
        accessToken: action.payload.accessToken ?? null,
      };
      state.isAuthenticated = true;
    },

    removeUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },

    setAccessToken: (state, action: PayloadAction<string | null>) => {
      if (state.user) {
        state.user.accessToken = action.payload;
      }
    },

    removeAccessToken: (state) => {
      if (state.user) {
        state.user.accessToken = null;
      }
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, removeUser, setAccessToken, removeAccessToken } =
  userSlice.actions;

export default userSlice.reducer;
