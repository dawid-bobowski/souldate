import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: User = {
  username: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string | null>) {
      state.username = action.payload;
    },
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
