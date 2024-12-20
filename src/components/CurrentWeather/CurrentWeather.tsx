import LoadingBar from "@/core/components/LoadingBar";
import { CurrentWeatherDto } from "@/core/dto/currentWeather.dto";
import { FetchState } from "@/core/dto/core/fetchState";
import Image from "next/image";
import { WeekDays } from "@/core/constants/date";
import getUnitSign from "@/core/utilities/unitsSign";
import useStore from "@/core/store/useStore";
import Link from "next/link";
import { AppRouteKey } from "@/core/constants/routes";

interface IProps {
  currentWeather: FetchState<CurrentWeatherDto>;
}

const CurrentWeather = ({ currentWeather }: IProps) => {
  if (currentWeather.loading) return <LoadingBar className="min-h-[200px]" />;
  if (currentWeather.error) return <h1>{currentWeather.error}</h1>;

  const unit = getUnitSign(useStore((state) => state.unit));

  const currentTime = new Date().toLocaleString("en-US", {
    timeZone: currentWeather.data?.timezone,
    timeStyle: "short",
  });
  const day =
    currentWeather.data && WeekDays[new Date(currentWeather.data.ts).getDay()];
  if (currentWeather.data)
    return (
      <div className="flex justify-center items-start gap-6 max-lg:flex-col max-lg:items-center self-start max-lg:scale-90 ">
        <div className="flex flex-col items-start justify-start gap-3">
          <h1 className="text-4xl">
            {currentWeather.data.city_name}, {currentWeather.data.country_code}
          </h1>
          <h2 className="text-2xl">{currentTime}</h2>
          <h3 className="text-xl">{day}</h3>
          <Link
            className="hover:text-main underline hoverTransition"
            href={AppRouteKey.historicalWeather(currentWeather.data.city_name)}
          >
            Historical Weather
          </Link>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Image
            src={`https://www.weatherbit.io/static/img/icons/${currentWeather.data.weather.icon}.png`}
            alt="weather"
            width={200}
            height={200}
          />
          <div className="flex flex-col justify-start items-start gap-2">
            <h2 className=" font-semibold text-2xl">
              {currentWeather.data.weather.description}
            </h2>
            <h1 className="font-bold opacity-50 text-6xl">
              {currentWeather.data.temp} °{unit}
            </h1>
          </div>
        </div>
        <div className="flex flex-col justify-center items-start my-auto ml-4 max-lg:ml-0">
          <span>
            Feels Like {currentWeather.data.app_temp} °{unit}
          </span>
          <span className="opacity-50">
            Humidity {currentWeather.data.rh} %
          </span>
          <span className="opacity-50">
            Wind Speed {currentWeather.data.wind_spd} Km/h
          </span>
          <span className="opacity-50">
            Air Quality {currentWeather.data.aqi}
          </span>
        </div>
      </div>
    );
};

export default CurrentWeather;
