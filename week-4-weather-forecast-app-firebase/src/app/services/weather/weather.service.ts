import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CurrentWeatherResponse } from '../../shared/common.model';
import { WeatherForecast } from '../../shared/forecast.model';
import { AuthService } from '../auth/auth.service';
import { DataTransformationService } from '../data-transformation.service';

enum REQUEST_TYPE {
  // SEARCH = 'search',
  CURRENT = 'current',
  FORECAST = 'forecast',
  // HISTORY = 'history',
  // FUTURE = 'future',
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private weatherForecastData?: WeatherForecast;
  /* Firebase API Key */
  // private readonly FIREBASE_API_KEY = environment.FIREBASE_API_KEY;
  /* Weather API key */
  private readonly WEATHER_API_KEY = environment.WEATHER_API_KEY;

  constructor(
    private _authService: AuthService,
    private _http: HttpClient,
    private _dataTransformation: DataTransformationService
  ) {}

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
        // Remove the forecast for the current day --> Sounds Bad, but will be
        // fixed in the next version
        // response.forecast.forecastday.splice(0, 1);
        // Return the forecast array
        return response;
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
      this._dataTransformation.transformForecastDataToCurrentWeatherData(
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

  // Build the URL for API Call
  private buildURL(requestType: REQUEST_TYPE, location: string): string {
    // Base URL will remain the same except for the request type.
    const BASE_URL = `http://api.weatherapi.com/v1/${requestType}.json?key=${this.WEATHER_API_KEY}`;
    // Appending the location query to get the data for a certain location
    return BASE_URL + `&q=${location}`;
  }
}
