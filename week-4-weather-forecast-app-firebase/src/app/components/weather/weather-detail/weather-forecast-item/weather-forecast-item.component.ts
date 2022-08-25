import { Component, Input, OnInit } from '@angular/core';
import { APP_PROPS } from '../../../../shared/constants/app-props';
import { Forecastday } from '../../../../shared/forecast.model';

@Component({
  selector: 'app-weather-forecast-item',
  templateUrl: './weather-forecast-item.component.html',
  styleUrls: ['./weather-forecast-item.component.css'],
})
export class WeatherForecastItemComponent implements OnInit {
  @Input('forecast') forecastItem!: Forecastday;
  @Input('index') index!: number;
  @Input('selected') selected!: boolean;
  @Input('selectedIndex') selectedIndex!: number;
  weekDay: string | null;

  constructor() {
    this.weekDay = null;
  }

  ngOnInit(): void {
    const weekDayId = new Date(this.forecastItem.date).getDay();
    const day = new Date(this.forecastItem.date).getDate();
    this.weekDay = `${APP_PROPS.WEEKDAY[weekDayId]} ${day}`;
  }
}
