import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface User {
  username: string;
  role: "admin" | "user";
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
// ✅ Get from localStorage
const storedUser = localStorage.getItem("user");

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: storedUser ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      // ✅ Save to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      // ✅ Remove from localStorage
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
