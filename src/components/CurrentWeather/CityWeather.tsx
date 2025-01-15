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
import { getDailyForecastWeatherServiceApi } from "@/core/services/forecast/methods";
import useStore from "@/core/store/useStore";

interface IProps {
  cityName?: string;
}

const CityWeather = ({ cityName }: IProps) => {
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
    if (cityName) {
      getWeather({ cityName });
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getWeather({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error: GeolocationPositionError) => errorHandler(error)
      );
    } else {
      toast.error("We couldn't get your location");
      getWeather({});
    }
  }, [unit, cityName]);

  function getWeather({ lat = 51.5072, lon = 0.1276, cityName = "" }) {
    SetCurrentWeather({ loading: true });
    getCurrentWeatherServiceApi(
      cityName.length > 0
        ? { city: cityName, units: unit }
        : { lat, lon, units: unit }
    )
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
    getDailyForecastWeatherServiceApi(
      cityName.length > 0
        ? { city: cityName, units: unit, days: 7 }
        : { lat, lon, units: unit, days: 7 }
    )
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

  function errorHandler(error: GeolocationPositionError) {
    toast.error(error.message || "Couldn't get location");
  }
  return (
    <main className="w-full min-h-screen p-8 grid grid-cols-1 justify-center items-center relative gap-9 max-lg:gap-4 max-lg:p-2">
      <BGDesign />
      <CurrentWeather currentWeather={currentWeather} />
      <ForecastWeather weatherForecast={weatherForecast} />
    </main>
  );
};

export default CityWeather;
