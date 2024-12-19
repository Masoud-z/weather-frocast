"use client";
import HistoricalWeatherChart from "@/components/HistoricalWeather/HistoricalWeatherChart";
import LoadingBar from "@/core/components/LoadingBar";
import { FetchState } from "@/core/dto/core/fetchState";
import { HistoryWeatherDto } from "@/core/dto/historicalWeather.dto";
import { getDailyHistoryServiceApi } from "@/core/services/history/methods";
import useStore from "@/core/store/useStore";
import { useEffect, useState } from "react";

interface IProps {
  params: { cityName: string };
}

const HistoricalWeatherPage = ({ params }: IProps) => {
  const cityName = decodeURIComponent(params.cityName);
  const unit = useStore((state) => state.unit);

  const [historyWeather, setHistoryWeather] = useState<
    FetchState<HistoryWeatherDto[]>
  >({
    loading: true,
  });

  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  today.setFullYear(today.getFullYear() - 1);
  const formattedOneYearAgo = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    getDailyHistoryServiceApi({
      city: cityName,
      start_date: formattedOneYearAgo,
      end_date: formattedToday,
      units: unit,
    })
      .then((res) => {
        setHistoryWeather({ loading: false, data: res.data.data });
      })
      .catch((error) => {
        setHistoryWeather({
          loading: false,
          error: error.message || "Something went Wrong!",
        });
      });
  }, [unit]);
  return (
    <div className="flex flex-col items-center justify-center mt-8 gap-8">
      <h1 className="font-bold text-4xl">
        Weather of {cityName} During Past Year
      </h1>
      {/* <HistoricalWeatherChart historyWeather={historyWeather.data} /> */}
      {historyWeather.loading && <LoadingBar />}
      {historyWeather.error && <h1>{historyWeather.error}</h1>}
      {historyWeather.data && (
        <HistoricalWeatherChart historyWeather={historyWeather.data} />
      )}
    </div>
  );
};

export default HistoricalWeatherPage;
