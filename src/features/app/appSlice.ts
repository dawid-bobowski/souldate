import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AppState = {
  isMenuOpen: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleMenu(state, action: PayloadAction<{ isMenuOpen: boolean }>) {
      const { isMenuOpen } = action.payload;
      state.isMenuOpen = isMenuOpen;
    },
  },
});

export const { toggleMenu } = appSlice.actions;
export default appSlice.reducer;
