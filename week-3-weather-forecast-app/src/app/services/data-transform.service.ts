import { Injectable } from '@angular/core';
import { Current } from '../models/common.model';
import { CurrentWeatherResponse } from '../models/current-weather.model';
import { Day } from '../models/forecast.model';

@Injectable({
  providedIn: 'root',
})
export class TransformationService {
  constructor() {}

  // Transform the data to the required format
  transformCurrentWeatherData(data: CurrentWeatherResponse) {
    // return {
    //   condition: data.current.condition,
    //   feelslike_c: data.current.feelslike_c,
    //   humidity: data.current.humidity,
    //   is_day: data.current.is_day,
    //   last_updated: data.current.last_updated,
    //   temp_c: data.current.temp_c,
    //   wind_kph: data.current.wind_kph,
    //   location: data.location,
    // };
  }
  /**
   *
   * @param currentForecastForTheDay An object of type Day
   * @param lastUpdated A string representing the last time data was updated.
   * @returns An object of type Current
   */
  transformForecastDataToCurrentWeatherData(
    currentForecastForTheDay: Day,
    lastUpdated: string
  ): Current {
    // Create a Current object using the forecast data
    const currentForecastData: Current = {
      condition: currentForecastForTheDay.condition,
      humidity: currentForecastForTheDay.avghumidity,
      is_day: 1,
      last_updated: lastUpdated,
      temp_c: currentForecastForTheDay.avgtemp_c,
      wind_kph: currentForecastForTheDay.maxwind_kph,
    };
    return currentForecastData;
  }
}
