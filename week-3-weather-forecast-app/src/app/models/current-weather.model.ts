import { Condition, Current, LocationW } from './common.model';

export interface CurrentWeatherResponse {
  location: LocationW;
  current: Current;
}

export interface CurrentWeather {
  last_updated_epoch: number;
  temp_c: number;
  is_day: number;
  condition: Condition;
  wind_kph: number;
  humidity: number;
  feelslike_c: number;
}
