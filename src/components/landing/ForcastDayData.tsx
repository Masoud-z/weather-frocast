import WeekDays from "@/core/constants/weekDays";
import { ForecastWeatherDto } from "@/core/dto/dailyForecast.dto";
import Image from "next/image";

interface IProps {
  dayForecast: ForecastWeatherDto;
  cityName: string;
  index: number;
}

const ForecastDayData = ({ dayForecast, cityName, index }: IProps) => {
  const day = WeekDays[new Date(dayForecast.datetime).getDay()];
  return (
    <div className=" w-80 h-80 z-50 grid grid-cols-2 grid-rows-2 gap-1 justify-center items-center bg-[rgba(81,169,255,0.3)] rounded-full shadow-[inset_0_35px_60px_-15px_rgba(81,169,255,0.6)] p-6 ">
      <div className="text-6xl text-center font-bold self-end">
        {dayForecast.temp}°
      </div>
      <Image
        src={`https://www.weatherbit.io/static/img/icons/${dayForecast.weather.icon}.png`}
        alt="weather"
        width={80}
        height={80}
        className="self-end"
      />
      <div className="flex flex-col text-center justify-center items-center">
        <div className="flex justify-center items-center opacity-50 gap-1">
          <span>H: {dayForecast.max_temp}°</span>
          <span>L: {dayForecast.min_temp}°</span>
        </div>
        <div className="text-lg font-medium">
          {index === 0 ? "Today" : index === 1 ? "Tomorrow" : day}
        </div>
      </div>
      <div className="text-sm text-center text-gray-500">{cityName}</div>
    </div>
  );
};

export default ForecastDayData;
