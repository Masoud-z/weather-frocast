import { ForecastWeatherDto } from "@/core/dto/dailyForecast.dto";
import ForecastDayData from "./ForcastDayData";
import { FetchState } from "@/core/dto/core/fetchState";
import LoadingBar from "@/core/components/LoadingBar";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AppRouteKey } from "@/core/constants/routes";

interface IProps {
  weatherForecast: FetchState<{ data: ForecastWeatherDto[]; cityName: string }>;
}

const ForecastWeather = ({ weatherForecast }: IProps) => {
  if (weatherForecast.loading) return <LoadingBar />;
  if (weatherForecast.error) return <h1>{weatherForecast.error}</h1>;

  const [dayCount, setDayCount] = useState(0);

  useEffect(() => {
    const width = window.innerWidth;
    setDayCount(
      width > 2400
        ? 7
        : width > 2100
        ? 6
        : width > 1750
        ? 5
        : width > 1400
        ? 4
        : width > 1056
        ? 3
        : width > 1024
        ? 2
        : 7
    );
  }, []);

  if (weatherForecast.data)
    return (
      <div className="flex flex-col gap-3 justify-start items-start max-lg:self-center self-start place-self-end max-lg:place-self-center">
        <Link
          href={AppRouteKey.extendedForecast(weatherForecast.data.cityName)}
          className="text-xl text-center underline hover:text-main transition-all ease-linear duration-300"
        >
          Extended Forecast
        </Link>
        <div className=" flex max-lg:flex-col justify-start max-lg:justify-center items-center gap-4 flex-wrap ">
          {weatherForecast.data.data.slice(0, dayCount).map((day, index) => (
            <ForecastDayData
              key={day.datetime}
              index={index}
              dayForecast={day}
              cityName={weatherForecast.data.cityName}
            />
          ))}
        </div>
      </div>
    );
};

export default ForecastWeather;
