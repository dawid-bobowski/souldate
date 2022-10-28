import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: User = {
  username: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.username = action.payload;
      localStorage.setItem('username', action.payload);
    },
    logout(state) {
      state.username = null;
      localStorage.clear();
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
