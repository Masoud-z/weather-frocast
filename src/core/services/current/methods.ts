import {
  GetCurrentWeatherRequest,
  GetCurrentWeatherSearchResult,
} from "@/core/dto/currentWeather";
import { httpGetService } from "../httpService";

export const getCurrentWeatherServiceApi = (
  params: GetCurrentWeatherRequest
) => {
  return httpGetService<
    GetCurrentWeatherSearchResult,
    GetCurrentWeatherRequest
  >("current", { params }, false);
};