import type { FC } from "react";
import type { IWeather } from "../utils/interfaces";
import { format } from "date-fns";

interface IProps {
  weather: IWeather;
}

const DetailedWeatherBlock: FC<IProps> = ({ weather }) => {
  return (
    <div className="p-10 hidden lg:block">
      <div className="text-2xl mb-3"><span className="font-bold">Feels like</span>: {weather.main.feels_like}°</div>
      <div className="text-2xl mb-3"><span className="font-bold">Description</span>: {weather.weather[0].description}</div>
      <div className="text-2xl mb-3"><span className="font-bold">Sunrise</span>: {format(weather.sys.sunrise, 'HH:mm')}</div>
      <div className="text-2xl mb-3"><span className="font-bold">Sunset</span>: {format(weather.sys.sunset, 'HH:mm')}</div>
      <div className="text-2xl mb-3"><span className="font-bold">Humidity</span>: {weather.main.humidity}%</div>
      <div className="text-2xl mb-3"><span className="font-bold">Wind</span>: {weather.wind.speed} m/s</div>
      <div className="text-2xl mb-3"><span className="font-bold">Pressure</span>: {weather.main.pressure} hPa</div>
    </div>
  )
}

export default DetailedWeatherBlock;
