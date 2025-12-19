import { configureStore } from '@reduxjs/toolkit';
import alertSlice from './alertSlice';
import weatherSlice from './weatherSlice'; 

export const store = configureStore({
  reducer: {
    alert: alertSlice,
    weather: weatherSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
