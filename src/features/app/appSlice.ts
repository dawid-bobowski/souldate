import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AppState = {
  isMenuOpen: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    hideMenu(state) {
      state.isMenuOpen = false;
    },
    toggleMenu(state) {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

export const { hideMenu, toggleMenu } = appSlice.actions;
export default appSlice.reducer;
