import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: User = {
  username: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string, token: string }>) {
      const { username, token } = action.payload;
      state.username = username;
      state.token = token;
      localStorage.setItem('username', username);
      localStorage.setItem('token', token);
    },
    logout(state) {
      state.username = null;
      state.token = null;
      localStorage.clear();
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
