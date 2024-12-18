import LoadingBar from "@/core/components/LoadingBar";
import { CurrentWeatherDto } from "@/core/dto/currentWeather";
import { FetchState } from "@/core/dto/core/fetchState";
import Image from "next/image";
import WeekDays from "@/core/constants/weekDays";

interface IProps {
  currentWeather: FetchState<CurrentWeatherDto>;
}

const CurrentWeather = ({ currentWeather }: IProps) => {
  if (currentWeather.loading) return <LoadingBar />;
  if (currentWeather.error) return <h1>{currentWeather.error}</h1>;

  const currentTime = new Date().toLocaleString("en-US", {
    timeZone: currentWeather.data?.timezone,
    timeStyle: "short",
  });
  const day =
    currentWeather.data && WeekDays[new Date(currentWeather.data.ts).getDay()];
  if (currentWeather.data)
    return (
      <div className="flex justify-center items-start gap-6 max-lg:flex-col max-lg:items-center">
        <div className="flex flex-col items-start justify-start gap-3">
          <h1 className="text-4xl">{currentWeather.data.city_name}</h1>
          <h2 className="text-2xl">{currentTime}</h2>
          <h3 className="text-xl">{day}</h3>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Image
            src={`https://www.weatherbit.io/static/img/icons/${currentWeather.data.weather.icon}.png`}
            alt="weather"
            width={200}
            height={200}
          />
          <div className="flex flex-col justify-start items-start gap-2">
            <h2 className=" font-semibold text-2xl">
              {currentWeather.data.weather.description}
            </h2>
            <h1 className="font-bold opacity-50 text-6xl">
              {currentWeather.data.temp} °C
            </h1>
          </div>
        </div>
        <div className="flex flex-col justify-center items-start my-auto ml-4 max-lg:ml-0">
          <span>Feels Like {currentWeather.data.app_temp} °C</span>
          <span className="opacity-50">
            Humidity {currentWeather.data.rh} %
          </span>
          <span className="opacity-50">
            Wind Speed {currentWeather.data.wind_spd} Km/h
          </span>
          <span className="opacity-50">
            Air Quality {currentWeather.data.aqi}
          </span>
        </div>
      </div>
    );
};

export default CurrentWeather;
