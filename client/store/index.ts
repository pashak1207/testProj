import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import userReducer from './slices/userSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
