"use client";
import { CurrentWeatherDto } from "@/core/dto/currentWeather";
import { FetchState } from "@/core/dto/fetchState";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CurrentWeather from "./CurrentWeather";
import { getCurrentWeatherServiceApi } from "@/core/services/current/methods";

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
    <main className="w-full min-h-screen flex justify-center items-center relative">
      <div className="absolute w-[40%] h-1/3 bottom-0 left-[10%] max-lg:hidden">
        <Image src={"/landing/bottom.png"} alt="bottom" fill />
      </div>
      <div className="absolute  h-4/5 w-[14%] top-[10%] right-0 max-lg:hidden">
        <Image src={"/landing/right.png"} alt="right" fill />
      </div>
      <div className="absolute bottom-[10%] right-[28%] w-[8vw] h-[8vw] max-lg:hidden">
        <Image src={"/landing/circle.png"} alt="circle" fill />
      </div>
      <div className="absolute bottom-[20%] left-[32%] w-[8vw] h-[8vw] max-lg:hidden">
        <Image src={"/landing/circle2.png"} alt="circle2" fill />
      </div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 max-lg:hidden">
        <Image src={"/landing/fade.png"} alt="fade" fill />
      </div>
      <CurrentWeather currentWeather={currentWeather} />
    </main>
  );
};

export default LandingPage;
