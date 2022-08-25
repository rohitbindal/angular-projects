import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrentWeatherResponse } from '../models/current-weather.model';
import { WeatherForecast } from '../models/forecast.model';
import { TransformationService } from './data-transform.service';

enum REQUEST_TYPE {
  SEARCH = 'search',
  CURRENT = 'current',
  FORECAST = 'forecast',
  // HISTORY = 'history',
  // FUTURE = 'future',
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  // Weather API Key
  private API_KEY = environment.API_KEY;
  private weatherForecastData?: WeatherForecast;
  constructor(
    private _http: HttpClient,
    private _transformationService: TransformationService
  ) {}

  // Build the URL for API Call
  private buildURL(requestType: REQUEST_TYPE, location: string): string {
    // Base URL will remain the same except for the request type.
    const BASE_URL = `http://api.weatherapi.com/v1/${requestType}.json?key=${this.API_KEY}`;
    // Appending the location query to get the data for a certain location
    let requestURL = BASE_URL + `&q=${location}`;
    return requestURL;
  }

  /**
   * Constructs a GET request to the Weather API to get the Current Weather.
   * @param location Name of the city
   * @returns An Object of type CurrentWeather
   */
  getCurrentWeather(location: string) {
    // Build a URL
    const requestURL = this.buildURL(REQUEST_TYPE.CURRENT, location);
    // Request the data from Weather API
    return this._http.get<CurrentWeatherResponse>(requestURL);
  }

  /**
   *
   * @param location Name of the city
   * @returns An Observable Array of objects of type ForecastDay
   */
  forecast(location: string) {
    // Build a URL
    const requestURL =
      this.buildURL(REQUEST_TYPE.FORECAST, location) + '&days=6&alerts=no';
    // Request the data from Weather API
    return this._http.get<WeatherForecast>(requestURL).pipe(
      map((response: WeatherForecast) => {
        // Creating a local data state.
        this.weatherForecastData = response;
        // Remove the forecast for the current day --> Sounds Bad, but will be fixed in the next version
        response.forecast.forecastday.splice(0, 1);
        // Return the forecast array
        return response.forecast.forecastday;
      })
    );
  }
  /**
   *
   * @param index Index of the forecast
   * @returns An Object of type CurrentWeatherResponse
   */
  getForecastForIndex(index: number) {
    // Get forecast data for the day using the index.
    const currentForecastForTheDay =
      this.weatherForecastData?.forecast.forecastday[index].day!;
    // Creating a Current object using the forecast data.
    const currentForecastData =
      this._transformationService.transformForecastDataToCurrentWeatherData(
        currentForecastForTheDay,
        this.weatherForecastData!.current.last_updated
      );
    // Create a new object to store the forecasted data and location
    const newWeatherData: CurrentWeatherResponse = {
      current: currentForecastData,
      location: this.weatherForecastData!.location,
    };
    // Return the updated data with the forecast.
    return newWeatherData;
  }
}
