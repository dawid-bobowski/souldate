import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AppState = {
  isMenuOpen: false,
  isLoading: false,
  currentTab: 0,
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
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    setTab(state, action: PayloadAction<{ newTab: number }>) {
      state.currentTab = action.payload.newTab;
    },
  },
});

export const { hideMenu, toggleMenu, startLoading, stopLoading, setTab } = appSlice.actions;
export default appSlice.reducer;
