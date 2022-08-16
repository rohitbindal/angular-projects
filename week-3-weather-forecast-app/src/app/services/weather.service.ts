import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CurrentWeatherResponse } from '../models/current-weather.model';
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
  searchCity(location: string) {}
  forecast(city: string) {}
}
