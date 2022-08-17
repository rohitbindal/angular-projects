export interface Condition {
  text: string;
  icon: string;
  code: number;
}

export interface LocationW {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface Current {
  last_updated: string;
  is_day: number;
  temp_c: number;
  condition: Condition;
  wind_kph: number;
  humidity: number;
  temp_f?: number;
  last_updated_epoch?: number;
  wind_mph?: number;
  wind_degree?: number;
  wind_dir?: string;
  pressure_mb?: number;
  pressure_in?: number;
  precip_mm?: number;
  precip_in?: number;
  cloud?: number;
  feelslike_c?: number;
  feelslike_f?: number;
  vis_km?: number;
  vis_miles?: number;
  uv?: number;
  gust_mph?: number;
  gust_kph?: number;
}
