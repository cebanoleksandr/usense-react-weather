import { Cog6ToothIcon, MapPinIcon } from "@heroicons/react/16/solid";
import { useEffect, useMemo, useState, type FC } from "react";
import Search from "./UI/Search";
import type { IWeather } from "../utils/interfaces";
import { isWeather } from "../utils/helper";
import type { IContextMenuItem } from "./UI/ContextMenu";
import ContextMenu from "./UI/ContextMenu";

interface IProps {
  city: string;
  onSearch: (search: string) => void;
}

const Header: FC<IProps> = ({ city, onSearch }) => {
  const [recentSearchedWeather, setRecentSearchedWeather] = useState<IWeather[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleStorage = () => {
      const keys = Object.keys(localStorage);
      const newWeather: IWeather[] = [];

      for (const key of keys) {
        const value = localStorage.getItem(key);
        if (!value) continue;

        try {
          const parsedValue = JSON.parse(value);
          if (isWeather(parsedValue.data)) {
            newWeather.push(parsedValue.data);
          }
        } catch { }
      }

      setRecentSearchedWeather(newWeather);
    }

    window.addEventListener("storage", handleStorage);
    handleStorage();

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const onSearchWeather = (weather: IWeather) => {
    onSearch(weather.name);
    setIsMenuOpen(false);
  }

  const options: IContextMenuItem[] = useMemo(() => {
    return recentSearchedWeather.map(r => ({ text: r.name, onSelect: () => onSearchWeather(r)}))
  }, [recentSearchedWeather]);

  return (
    <div className="flex items-center justify-between flex-col-reverse lg:flex-row w-full bg-black rounded-t-4xl overflow-hidden py-3 px-6">
      <div className="lg:flex items-center gap-3 hidden">
        <MapPinIcon className="size-6" />
        <span className="text-xl font-bold">{city}</span>
      </div>

      <div className="flex items-center gap-3">
        <Search onSearch={onSearch} />
        
        <ContextMenu
          items={options}
          state={isMenuOpen}
          setState={setIsMenuOpen}
        >
          <Cog6ToothIcon
            className="size-6 cursor-pointer hover:text-gray-200 transition duration-300"
            onClick={() => setIsMenuOpen(true)}
          />
        </ContextMenu>
      </div>
    </div>
  )
}

export default Header;
