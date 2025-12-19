import { MapPinIcon } from "@heroicons/react/16/solid";
import type { FC } from "react";
import type { IWeather } from "../utils/interfaces";
import { format } from "date-fns";

interface IProps {
  weather: IWeather;
}

const MainWeatherBlock: FC<IProps> = ({ weather }) => {
  return (
    <div className="p-10 block w-full text-center lg:w-auto lg:inline-block lg:text-left">
      <div className="flex items-center gap-2 border-b-2 border-b-white pb-2 mb-3 justify-center lg:justify-left">
        <MapPinIcon className="size-8" />
        <p className="text-3xl font-bold text-center lg:text-left">{weather.name}, {weather.sys.country}</p>
      </div>

      <div className="font-semibold mb-3 text-center lg:text-left">{format(new Date(), 'EEEE, MMMM yy')}</div>

      <div className="font-bold text-9xl mb-3 text-center ml-10 lg:ml-0 lg:text-left">{Math.round(weather.main.temp)}°</div>

      <div className="text-2xl font-semibold mb-3 text-center lg:text-left">{weather.weather[0].main}</div>

      <div className="text-xl text-center lg:text-left">
        H: {Math.round(weather.main.temp_max)}° / L: {Math.round(weather.main.temp_min)}°
      </div>
    </div>
  )
}

export default MainWeatherBlock;
