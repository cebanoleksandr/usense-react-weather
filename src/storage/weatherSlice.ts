import { createSlice } from '@reduxjs/toolkit';
import type { IWeather } from '../utils/interfaces';

interface WeatherState {
  weather: IWeather | null;
}

const initialState: WeatherState = {
  weather: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeatherAC: (state, action: { payload: IWeather | null }) => {
      state.weather = action.payload;
    },
  },
});

export const { setWeatherAC } = weatherSlice.actions;
export default weatherSlice.reducer;
