import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: User = {
  username: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string }>) {
      const { username } = action.payload;
      state.username = username;
      localStorage.setItem('username', username);
    },
    logout(state) {
      state.username = null;
      localStorage.clear();
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
