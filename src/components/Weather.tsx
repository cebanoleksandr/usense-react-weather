import { useAppDispatch, useAppSelector } from '../storage/hooks';
import { getCashedWeater } from '../utils/helper';
import { setWeatherAC } from '../storage/weatherSlice';
import { getWeather } from '../api/weater';
import { setAlertAC } from '../storage/alertSlice';
import Header from './Header';
import MainWeatherBlock from './MainWeatherBlock';
import DetailedWeatherBlock from './DetailedWeatherBlock';

const Weather = () => {
  const { weather } = useAppSelector(state => state.weather);

  const dispatch = useAppDispatch();

  const fetchWeather = async (city: string) => {
    if (!city) return;

    const cashedWeather = getCashedWeater(localStorage.getItem(city.toLowerCase()));

    if (!!cashedWeather) {
      dispatch(setWeatherAC(cashedWeather));
      return;
    }

    try {
      const data = await getWeather(city);
      const cachePayload = { data, timestamp: Date.now() };

      localStorage.setItem(city.toLowerCase(), JSON.stringify(cachePayload));

      dispatch(setWeatherAC(data));
    } catch (err: any) {
      dispatch(setAlertAC({ text: 'Not found such a city!', mode: 'error' }));
      dispatch(setWeatherAC(null));
    }
  };

  return (
    <div className="w-full h-full bg-gray-400 opacity-60 rounded-4xl">
      <Header city={weather?.name ?? 'Location'} onSearch={fetchWeather} />

      {!!weather && (
        <div className='flex flex-wrap justify-between'>
          <MainWeatherBlock weather={weather} />
          <DetailedWeatherBlock weather={weather} />
        </div>
      )}

      {!weather && (
        <div className="flex justify-center items-center h-full text-8xl text-center">Start searching for the weather</div>
      )}
    </div>
  );
};

export default Weather;
