import { IntRange } from "./core/numberRange";
import { Units } from "../enums/units";
import { Lang } from "../enums/languages";
import { WeatherDetailDto } from "./currentWeather.dto";

export interface GetDailyForecastRequest {
  lang?: Lang;
  units?: Units;
  lat?: number;
  lon?: number;
  city?: string;
  include?: "minutely" | "alerts" | "lightning";
  days: IntRange<1, 16>;
}

export interface ForecastWeatherDto {
  valid_date: string;
  ts: number;
  datetime: string;
  wind_gust_spd: number;
  wind_spd: number;
  wind_dir: number;
  wind_cdir: string;
  wind_cdir_full: string;
  temp: number;
  max_temp: number;
  min_temp: number;
  high_temp: number;
  low_temp: number;
  app_max_temp: number;
  app_min_temp: number;
  pop: number;
  precip: number;
  snow: number;
  snow_depth: number;
  slp: number;
  pres: number;
  dewpt: number;
  rh: number;
  weather: WeatherDetailDto;
  clouds_low: number;
  clouds_mid: number;
  clouds_hi: number;
  clouds: number;
  vis: number;
  max_dhi: number;
  uv: number;
  moon_phase: number;
  moon_phase_lunation: number;
  moonrise_ts: number;
  moonset_ts: number;
  sunrise_ts: number;
  sunset_ts: number;
}

export interface GetDailyForecastResult {
  lat: string;
  lon: string;
  timezone: string;
  city_name: string;
  country_code: string;
  state_code: string;
  data: ForecastWeatherDto[];
}
