"use client";
import { CurrentWeatherDto } from "@/core/dto/currentWeather.dto";
import { FetchState } from "@/core/dto/core/fetchState";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CurrentWeather from "./CurrentWeather";
import { getCurrentWeatherServiceApi } from "@/core/services/current/methods";
import BGDesign from "./BGDesign";
import ForecastWeather from "./ForecastWeather";
import { ForecastWeatherDto } from "@/core/dto/dailyForecast.dto";
import { getDailyForecastWeatherServiceApi } from "@/core/services/forcast/methods";
import useStore from "@/core/store/useStore";

const LandingPage = () => {
  const unit = useStore((state) => state.unit);
  const [currentWeather, SetCurrentWeather] = useState<
    FetchState<CurrentWeatherDto>
  >({
    loading: true,
  });
  const [weatherForecast, SetWeatherForecast] = useState<
    FetchState<{ data: ForecastWeatherDto[]; cityName: string }>
  >({
    loading: true,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        getCurrentWeather(position.coords.latitude, position.coords.longitude);
        getWeatherForecast(position.coords.latitude, position.coords.longitude);
      }, errorHandler);
    } else {
      toast.error("We couldn't get your location");
      getCurrentWeather();
      getWeatherForecast();
    }
  }, [unit]);

  function getCurrentWeather(lat: number = 51.5072, lon: number = 0.1276) {
    SetCurrentWeather({ loading: true });
    getCurrentWeatherServiceApi({ lat, lon, units: unit })
      .then((res) => {
        const data = res.data.data[0];
        if (data) {
          SetCurrentWeather({ loading: false, data });
        } else {
          toast.error("No Data");
          SetCurrentWeather({ loading: false, error: "No Data" });
        }
      })
      .catch((err) => {
        SetCurrentWeather({
          loading: false,
          error: `${err.message || "Something went wrong"}`,
        });
      });
  }

  function getWeatherForecast(lat: number = 51.5072, lon: number = 0.1276) {
    getDailyForecastWeatherServiceApi({ lat, lon, days: 7, units: unit })
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

  function errorHandler(error: any) {
    toast.error(error.message || "Couldn't get location");
  }
  return (
    <main className="w-full min-h-screen p-8 grid grid-cols-1 justify-center items-center relative gap-9">
      <BGDesign />
      <CurrentWeather currentWeather={currentWeather} />
      <ForecastWeather weatherForecast={weatherForecast} />
    </main>
  );
};

export default LandingPage;
