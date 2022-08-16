import { Component, Input, OnInit } from '@angular/core';
import { CurrentWeatherResponse } from 'src/app/models/current-weather.model';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.css'],
})
export class WeatherItemComponent implements OnInit {
  @Input('weather') weatherData!: CurrentWeatherResponse;
  constructor() {}

  ngOnInit(): void {}
}
