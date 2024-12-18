import {
  GetDailyForecastRequest,
  GetDailyForecastResult,
} from "@/core/dto/dailyForecast.dto";
import { httpGetService } from "../httpService";

export const getDailyForecastWeatherServiceApi = (
  params: GetDailyForecastRequest
) => {
  return httpGetService<GetDailyForecastResult, GetDailyForecastRequest>(
    "forecast/daily",
    { params },
    true
  );
};
