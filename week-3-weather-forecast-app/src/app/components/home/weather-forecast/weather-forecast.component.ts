import { Component, Input, OnInit } from '@angular/core';
import { Forecastday } from 'src/app/models/forecast.model';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css'],
})
export class WeatherForecastComponent implements OnInit {
  @Input('location') location?: string;
  forecastData?: Forecastday[];
  constructor(private _weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getForecastData();
  }
  getForecastData() {
    if (this.location) {
      this._weatherService.forecast(this.location).subscribe((response) => {
        this.forecastData = response;
      });
    }
  }
}
