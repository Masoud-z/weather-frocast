import LoadingBar from "@/core/components/LoadingBar";
import { CurrentWeatherDto } from "@/core/dto/currentWeather";
import { FetchState } from "@/core/dto/fetchState";
import Image from "next/image";

interface IProps {
  currentWeather: FetchState<CurrentWeatherDto>;
}

const CurrentWeather = ({ currentWeather }: IProps) => {
  const now = new Date();
  const currentTime = now.toLocaleTimeString(undefined, { timeStyle: "short" });
  if (currentWeather.loading) return <LoadingBar />;
  if (currentWeather.error) return <h1>{currentWeather.error}</h1>;

  if (currentWeather.data)
    return (
      <div className="flex justify-center items-start gap-6 max-lg:flex-col max-lg:items-center">
        <div className="flex flex-col items-start justify-start gap-3">
          <h1 className="text-4xl">{currentWeather.data.city_name}</h1>
          <h1 className="text-2xl">{currentTime}</h1>
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
        <div className="flex flex-col justify-center items-start my-auto">
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
