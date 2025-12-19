import { api } from "./";

export const getWeather = async (city: string) => {
  const response = await api.get(`?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`);
  return response.data;
}
