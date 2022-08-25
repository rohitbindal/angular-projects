import { Component, Input, OnInit } from '@angular/core';
import { CurrentWeatherResponse } from 'src/app/models/current-weather.model';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.css'],
})
export class WeatherItemComponent implements OnInit {
  // Get the weatherData from the parent component.
  @Input('weather') weatherDataInput!: CurrentWeatherResponse;
  weatherData!: CurrentWeatherResponse;
  constructor(private _weatherService: WeatherService) {}

  ngOnInit(): void {
    // Initialize weather data.
    this.weatherData = this.weatherDataInput;
  }

  /**
   * @param index Index of the forecast clicked.
   * @description Update the current data to the forecast data when a forecast is clicked
   */
  onForecastClicked(index: number) {
    this.weatherData = this._weatherService.getForecastForIndex(index);
  }
}
