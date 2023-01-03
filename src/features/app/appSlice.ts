import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AppState = {
  isMenuOpen: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleMenu(state) {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

export const { toggleMenu } = appSlice.actions;
export default appSlice.reducer;
