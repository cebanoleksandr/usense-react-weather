import Alert from "./components/UI/Alert";
import Weather from "./components/Weather";
import cn from "classnames";
import { getThemeClass } from "./utils/helper";
import { useAppSelector } from "./storage/hooks";

const App = () => {
  const { weather } = useAppSelector(state => state.weather);

  return (
    <div className={cn(getThemeClass(weather), 'app-container h-screen w-screen flex items-center justify-center py-20 px-10 lg:px-40')}>
      <Weather />
      <Alert />
    </div>
  );
};

export default App;
