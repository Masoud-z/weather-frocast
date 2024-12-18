"use client";
import { CurrentWeatherDto } from "@/core/dto/currentWeather";
import { FetchState } from "@/core/dto/core/fetchState";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CurrentWeather from "./CurrentWeather";
import { getCurrentWeatherServiceApi } from "@/core/services/current/methods";
import BGDesign from "./BGDesign";
import ForecastWeather from "./ForecastWeather";

interface IProps {}

const LandingPage = ({}: IProps) => {
  const [geoError, setGeoError] = useState("");
  const [currentWeather, SetCurrentWeather] = useState<
    FetchState<CurrentWeatherDto>
  >({
    loading: true,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        getCurrentWeather(position.coords.latitude, position.coords.longitude);
      }, errorHandler);
    } else {
      toast.error("We couldn't get your location");
      getCurrentWeather();
    }
  }, []);

  function getCurrentWeather(lat: number = 51.5072, lon: number = 0.1276) {
    SetCurrentWeather({ loading: true });
    getCurrentWeatherServiceApi({ lat, lon })
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

  function errorHandler(error: any) {
    toast.error(error.message || "Couldn't get location");
  }
  return (
    <main className="w-full p-8 min-h-screen grid-cols-1 justify-center items-center relative">
      <BGDesign />
      <CurrentWeather currentWeather={currentWeather} />
      <ForecastWeather />
    </main>
  );
};

export default LandingPage;
