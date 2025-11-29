import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  logged_in: any | null;
}

const initialState: AuthState = {
  token: null,
  logged_in: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; user: any }>) => {
      state.token = action.payload.token;
      state.logged_in = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.logged_in = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
