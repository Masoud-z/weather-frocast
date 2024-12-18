import { Units } from "../enums/units";

export interface GetHistoricalWeatherRequest {
  start_date: string;
  end_date: string;
  units: Units;
  lat?: string;
  lon?: string;
  city?: string;
}

export interface HistoryWeatherDto {
  rh: number;
  wind_spd: number;
  slp: number;
  max_wind_spd: number;
  max_wind_dir: number;
  max_wind_spd_ts: number;
  wind_gust_spd: number;
  min_temp_ts: number;
  max_temp_ts: number;
  dewpt: number;
  snow: number;
  snow_depth: number;
  precip: number;
  precip_gpm: number;
  wind_dir: 189;
  max_dhi: number;
  dhi: number;
  max_temp: number;
  pres: number;
  max_uv: number;
  t_dhi: number;
  datetime: string;
  temp: number;
  min_temp: number;
  clouds: number;
  ts: number;
  revision_status: "interim" | "final";
}

export interface GetHistoricalWeatherResult {
  timezone: string;
  state_code: string;
  lat: number;
  lon: number;
  country_code: string;
  station_id: string;
  sources: string[];
  city_name: string;
  city_id: string;
  data: HistoryWeatherDto[];
}
