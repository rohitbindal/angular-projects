import { Component, Input, OnInit } from '@angular/core';
import { Forecastday } from '../../../../shared/forecast.model';

@Component({
  selector: 'app-weather-daily-forecast-detail',
  templateUrl: './weather-daily-forecast-detail.component.html',
  styleUrls: ['./weather-daily-forecast-detail.component.css'],
})
export class WeatherDailyForecastDetailComponent implements OnInit {
  @Input('forecastDetails') forecastDetail!: Forecastday;

  constructor() {}

  ngOnInit(): void {}
}
