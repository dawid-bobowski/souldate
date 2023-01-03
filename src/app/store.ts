import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import appReducer from '../features/app/appSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
