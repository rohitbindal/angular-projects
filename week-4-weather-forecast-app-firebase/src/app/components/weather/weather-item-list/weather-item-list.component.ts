import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, map, Subscription } from 'rxjs';
import { DataStorageService } from '../../../services/data-storage/data-storage.service';
import { WeatherService } from '../../../services/weather/weather.service';
import { CurrentWeatherResponse } from '../../../shared/common.model';
import { APP_PROPS } from '../../../shared/constants/app-props';

@Component({
  selector: 'app-weather-item-list',
  templateUrl: './weather-item-list.component.html',
  styleUrls: ['./weather-item-list.component.css'],
})
export class WeatherItemListComponent implements OnInit, OnDestroy {
  weatherSubscription?: Subscription;
  searchLocation: string = '';
  weatherData: CurrentWeatherResponse[] = [];
  fromFirebase = false;

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

  constructor(
    private _weatherService: WeatherService,
    private _dataStorage: DataStorageService
  ) {}

  ngOnInit(): void {
    this.getDataFromFirebase();
  }

  getDataFromFirebase() {
    this._dataStorage.fetchData().subscribe((response) => {
      if (response.length) {
        from(response)
          .pipe(
            map((city) => {
              this.getWeatherData(city, true);
            })
          )
          .subscribe();
      } else {
        this.fromFirebase = false;
        this.getWeatherData(APP_PROPS.DEFAULT_LOCATION, this.fromFirebase);
      }
    });
  }

  /**]
   *  Method to use the Weather Service to get the current Weather.
   * @param {string} location
   * @param {boolean} firebase
   */
  getWeatherData(location: string, firebase: boolean) {
    this.LOADING = true;
    this.weatherSubscription = this._weatherService
      .getCurrentWeather(location)
      .subscribe({
        next: (response) => {
          this.weatherData.push(response);
          this.fromFirebase = firebase;
          // Calling updateProperties() method with success as a response
          this.updateProperties(this.RESPONSE_TYPE.success);
        },
        error: (error: HttpErrorResponse) => {
          // Calling updateProperties() method with error as response
          this.updateProperties(this.RESPONSE_TYPE.error);
        },
      });
  }

  /**
   * Method to call the getWeatherData method when the search button is clicked
   */
  getWeatherOnClick() {
    this.weatherData = [];
    this.getWeatherData(this.searchLocation, false);
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
