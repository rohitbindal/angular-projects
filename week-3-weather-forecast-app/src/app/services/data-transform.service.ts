import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TransformationService {
  constructor() {}

  // Transform the data to the required format
  // transformCurrentWeatherData(data: CurrentWeatherResponse): CurrentWeather {
  //   return {
  //     condition: data.current.condition,
  //     feelslike_c: data.current.feelslike_c,
  //     humidity: data.current.humidity,
  //     is_day: data.current.is_day,
  //     last_updated_epoch: data.current.last_updated_epoch,
  //     temp_c: data.current.temp_c,
  //     wind_kph: data.current.wind_kph,
  //   };
  // }
}
