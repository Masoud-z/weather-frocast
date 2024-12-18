import { httpGetService } from "../httpService";
import {
  GetHistoricalWeatherRequest,
  GetHistoricalWeatherResult,
} from "@/core/dto/historicalWeather.dto";

export const getDailyHistoryServiceApi = (
  params: GetHistoricalWeatherRequest
) => {
  return httpGetService<
    GetHistoricalWeatherResult,
    GetHistoricalWeatherRequest
  >("history/daily", { params }, true);
};
