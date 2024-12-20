import { Months, WeekDays } from "@/core/constants/date";
import { ForecastWeatherDto } from "@/core/dto/dailyForecast.dto";
import useStore from "@/core/store/useStore";
import getUnitSign from "@/core/utilities/unitsSign";
import Image from "next/image";

interface IProps {
  data: ForecastWeatherDto;
  index: number;
}

const ExtendedDayForecast = ({ data, index }: IProps) => {
  const unit = getUnitSign(useStore((state) => state.unit));
  const datetime = new Date(data.datetime);
  const day = WeekDays[datetime.getDay()];
  const month = Months[datetime.getMonth()];
  const date = datetime.getDate();
  return (
    <div className="flex w-10/12 max-lg:w-11/12 justify-between items-center p-4 rounded-lg border border-main border-solid bg-[rgba(81,169,255,0.3)] hoverTransition shadow-[inset_0_35px_60px_-15px_rgba(81,169,255,0.6)] hover:bg-[rgba(81,169,255,0.1)]">
      <div className="flex flex-col items-start gap-1">
        <h1 className="font-bold text-2xl max-lg:text-lg">
          {index === 0 ? "Today" : index === 1 ? "Tomorrow" : day}
        </h1>
        <span className="font-semibold text-base opacity-75">
          {month} {date}
        </span>
      </div>
      <div className="flex items-center gap-2 justify-center">
        <Image
          src={`https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png`}
          alt="weather"
          width={80}
          height={80}
          className="max-lg:hidden"
        />
        <div className="flex flex-col items-start gap-1 max-lg:text-end ">
          <span className="font-bold text-xl w-full max-lg:text-end max-lg:text-lg">
            {data.max_temp} °{unit} / {data.min_temp} °{unit}
          </span>
          <span className="font-semibold text-lg opacity-75 max-lg:text-base">
            <span className="max-lg:hidden">Feels Like: </span>
            <span className="lg:hidden">FL: </span>
            {data.app_max_temp} °{unit} / {data.app_min_temp} °{unit}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-start gap-1 max-lg:hidden">
        <span>
          Day-time High: {data.high_temp} °{unit}
        </span>
        <span>
          Night-time Low: {data.low_temp} °{unit}
        </span>
      </div>

      <div className="flex flex-col items-start gap-1 max-lg:hidden">
        <span>Wind Speed: {data.wind_spd} km/h</span>
        <span>Wind Direction: {data.wind_cdir_full}</span>
      </div>
    </div>
  );
};

export default ExtendedDayForecast;
