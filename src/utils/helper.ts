import type { IClouds, ICord, IMain, ISys, IWeather, IWind, Weather } from "./interfaces";

export const getCashedWeater = (cachedData: string | null): IWeather | null => {
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    const isFresh = Date.now() - timestamp < 10 * 60 * 1000;

    if (isFresh) {
      return data;
    }
  }

  return null;
}

export const getThemeClass = (weather: IWeather | null): string => {
  if (!weather) return 'default-bg';
  const main = weather.weather[0].main.toLowerCase();
  if (main.includes('rain') || main.includes('drizzle')) return 'rainy-bg';
  if (main.includes('snow')) return 'snowy-bg';
  if (main.includes('cloud')) return 'cloudy-bg';
  if (main.includes('clear')) return 'sunny-bg';
  return 'default-bg';
};

export const isNumber = (v: unknown): v is number =>
  typeof v === 'number';

export const isString = (v: unknown): v is string =>
  typeof v === 'string';

export const isCoord = (v: unknown): v is ICord =>
  typeof v === 'object' &&
  v !== null &&
  isNumber((v as ICord).lon) &&
  isNumber((v as ICord).lat);

export const isWeatherItem = (v: unknown): v is Weather =>
  typeof v === 'object' &&
  v !== null &&
  isNumber((v as Weather).id) &&
  isString((v as Weather).main) &&
  isString((v as Weather).description) &&
  isString((v as Weather).icon);

export const isMain = (v: unknown): v is IMain =>
  typeof v === 'object' &&
  v !== null &&
  isNumber((v as IMain).temp) &&
  isNumber((v as IMain).feels_like) &&
  isNumber((v as IMain).temp_min) &&
  isNumber((v as IMain).temp_max) &&
  isNumber((v as IMain).pressure) &&
  isNumber((v as IMain).humidity) &&
  isNumber((v as IMain).sea_level) &&
  isNumber((v as IMain).grnd_level);

export const isWind = (v: unknown): v is IWind =>
  typeof v === 'object' &&
  v !== null &&
  isNumber((v as IWind).speed) &&
  isNumber((v as IWind).deg);

export const isClouds = (v: unknown): v is IClouds =>
  typeof v === 'object' &&
  v !== null &&
  isNumber((v as IClouds).all);

export const isSys = (v: unknown): v is ISys =>
  typeof v === 'object' &&
  v !== null &&
  isString((v as ISys).country) &&
  isNumber((v as ISys).sunrise) &&
  isNumber((v as ISys).sunset);

export const isWeather = (v: unknown): v is IWeather => {
  if (typeof v !== 'object' || v === null) return false;

  const w = v as IWeather;

  return (
    isNumber(w.id) &&
    isCoord(w.coord) &&
    Array.isArray(w.weather) &&
    w.weather.every(isWeatherItem) &&
    isString(w.base) &&
    isMain(w.main) &&
    isNumber(w.visibility) &&
    isWind(w.wind) &&
    isClouds(w.clouds) &&
    isNumber(w.dt) &&
    isSys(w.sys) &&
    isNumber(w.timezone) &&
    isString(w.name) &&
    isNumber(w.cod)
  );
};



