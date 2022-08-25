import { Injectable } from '@angular/core';
import { Current } from '../shared/common.model';
import { Day } from '../shared/forecast.model';

@Injectable({
  providedIn: 'root',
})
export class DataTransformationService {
  /**
   * @param currentForecastForTheDay An object of type Day
   * @param lastUpdated A string representing the last time data was updated.
   * @returns An object of type Current
   */
  transformForecastDataToCurrentWeatherData(
    currentForecastForTheDay: Day,
    lastUpdated: string
  ): Current {
    // Create a Current object using the forecast data
    return {
      condition: currentForecastForTheDay.condition,
      humidity: currentForecastForTheDay.avghumidity,
      is_day: 1,
      last_updated: lastUpdated,
      temp_c: currentForecastForTheDay.avgtemp_c,
      wind_kph: currentForecastForTheDay.maxwind_kph,
    };
  }
}
