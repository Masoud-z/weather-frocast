"use client";
import { CurrentWeatherDto } from "@/core/dto/currentWeather";
import { FetchState } from "@/core/dto/fetchState";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CurrentWeather from "./CurrentWeather";
import { getCurrentWeatherServiceApi } from "@/core/services/current/methods";
import BGDesign from "./BGDesign";

interface IProps {}

const LandingPage = ({}: IProps) => {
  const [geoError, setGeoError] = useState("");
  const [currentWeather, SetCurrentWeather] = useState<
    FetchState<CurrentWeatherDto>
  >({
    loading: true,
  });

  useEffect(() => {
    let lat = 51.5072;
    let lon = 0.1276;
    if (navigator.geolocation) {
      console.log("inside");
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        lat = position.coords.latitude;
        lon = position.coords.longitude;
      }, errorHandler);
    }
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
        toast.error(err.message || "Something went wrong");
        SetCurrentWeather({
          loading: false,
          error: `${err.message || "Something went wrong"}`,
        });
      });
  }, []);

  function errorHandler(error: any) {
    toast.error(error.message || "Couldn't get location");
  }
  return (
    <main className="w-full p-8 min-h-screen grid-cols-1 justify-center items-center relative">
      <BGDesign />
      <CurrentWeather currentWeather={currentWeather} />
    </main>
  );
};

export default LandingPage;
