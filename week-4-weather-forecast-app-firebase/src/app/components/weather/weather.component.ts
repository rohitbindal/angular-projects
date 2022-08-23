import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from '../../services/weather/weather.service';
import { CurrentWeatherResponse } from '../../shared/common.model';
import { APP_PROPS } from '../../shared/constants/app-props';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit, OnDestroy {
  weatherSubscription?: Subscription;
  weatherData?: CurrentWeatherResponse;
  searchLocation: string = '';

  // Store the searchLocation value if the given location is not found
  badLocation: string = '';
  // Flag for loader
  LOADING = false;
  // Flag for Error elements in HTML template
  HAS_ERROR = false;
  // An object to hold the string flags to update the flags above.
  RESPONSE_TYPE = {
    success: 'success',
    error: 'error',
  };

  constructor(private _weatherService: WeatherService) {}

  ngOnInit(): void {
    // Get the weather for a specified location when the application is
    // launched.
    this.getWeatherData(APP_PROPS.DEFAULT_LOCATION);
  }

  /**
   *
   * @param location Name of the City
   * @Description Method to use the Weather Service to get the current Weather.
   */
  getWeatherData(location: string) {
    this.LOADING = true;
    this.weatherSubscription = this._weatherService
      .getCurrentWeather(location)
      .subscribe({
        next: (response) => {
          this.weatherData = response;
          // Calling updateProperties()
          // method with success as a
          // response
          this.updateProperties(this.RESPONSE_TYPE.success);
        },
        error: (error: HttpErrorResponse) => {
          // Calling updateProperties()
          // method with error as a
          // response
          this.updateProperties(this.RESPONSE_TYPE.error);
        },
      });
  }

  /**
   * Method to call the getWeatherData method when the search button is clicked
   */
  getWeatherOnClick() {
    this.weatherData = undefined;
    this.getWeatherData(this.searchLocation);
  }

  ngOnDestroy(): void {
    // Remove the subscription
    this.weatherSubscription?.unsubscribe();
  }

  /**
   *
   * @param type A string representing the response from getWeatherData()
   *   method.
   * @Description Method to update LOADING, HAS_ERROR and bad_location
   *   properties based on the response from getWeatherData() method.
   */
  private updateProperties(type: string) {
    // If there is an error, update the flags accordingly.
    if (type === this.RESPONSE_TYPE.error) {
      this.LOADING = false;
      this.HAS_ERROR = true;
      this.badLocation = this.searchLocation;
    } else {
      this.LOADING = false;
      this.HAS_ERROR = false;
      this.badLocation = '';
    }
  }
}
