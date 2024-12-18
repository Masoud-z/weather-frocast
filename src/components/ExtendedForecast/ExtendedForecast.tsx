"use client";

import LoadingBar from "@/core/components/LoadingBar";
import { FetchState } from "@/core/dto/core/fetchState";
import { ForecastWeatherDto } from "@/core/dto/dailyForecast.dto";
import { getDailyForecastWeatherServiceApi } from "@/core/services/forecast/methods";
import useStore from "@/core/store/useStore";
import { useEffect, useState } from "react";
import ExtendedDayForecast from "./ExtendedDayForecast";

interface Props {
  cityName: string;
}

const ExtendedForecast = ({ cityName }: Props) => {
  const unit = useStore((state) => state.unit);

  const [weatherForecast, SetWeatherForecast] = useState<
    FetchState<{ data: ForecastWeatherDto[]; cityName: string }>
  >({
    loading: true,
  });

  useEffect(() => {
    getWeatherForecast(cityName);
  }, [unit, cityName]);

  function getWeatherForecast(cityName: string) {
    SetWeatherForecast({ loading: true });
    getDailyForecastWeatherServiceApi({ city: cityName, days: 7, units: unit })
      .then((res) => {
        SetWeatherForecast({
          loading: false,
          data: { data: res.data.data, cityName: res.data.city_name },
        });
      })
      .catch((err) => {
        SetWeatherForecast({
          loading: false,
          error: `${err.message || "Something went wrong"}`,
        });
      });
  }
  return (
    <div className="flex flex-col my-6 justify-center items-center gap-7">
      <h1 className="font-bold text-4xl mb-5">{cityName}</h1>
      {weatherForecast.loading && <LoadingBar />}
      {weatherForecast.error && <h1>{weatherForecast.error}</h1>}
      {weatherForecast.data &&
        weatherForecast.data.data.map((forecast, index) => (
          <ExtendedDayForecast
            key={forecast.datetime}
            data={forecast}
            index={index}
          />
        ))}
    </div>
  );
};

export default ExtendedForecast;
