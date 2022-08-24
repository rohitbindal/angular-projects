import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentWeatherResponse } from '../../../../shared/common.model';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.css'],
})
export class WeatherItemComponent implements OnInit {
  @Input('weatherData') weatherData!: CurrentWeatherResponse;

  // weatherData: CurrentWeatherResponse = {
  //   current: {
  //     cloud: 100,
  //     condition: {
  //       text: 'Light rain',
  //       icon: '//cdn.weatherapi.com/weather/64x64/day/296.png',
  //       code: 1183,
  //     },
  //     feelslike_c: 27,
  //     feelslike_f: 80.6,
  //     gust_kph: 40,
  //     gust_mph: 24.8,
  //     humidity: 94,
  //     is_day: 1,
  //     last_updated: '2022-08-23 15:00',
  //     last_updated_epoch: 1661247000,
  //     precip_in: 0.02,
  //     precip_mm: 0.5,
  //     pressure_in: 29.53,
  //     pressure_mb: 1000,
  //     temp_c: 25,
  //     temp_f: 77,
  //     uv: 6,
  //     vis_km: 1.6,
  //     vis_miles: 0,
  //     wind_degree: 90,
  //     wind_dir: 'E',
  //     wind_kph: 24.1,
  //     wind_mph: 15,
  //   },
  //   location: {
  //     country: 'India',
  //     lat: 26.92,
  //     localtime: '2022-08-23 15:12',
  //     localtime_epoch: 1661247764,
  //     lon: 75.82,
  //     name: 'Jaipur',
  //     region: 'Rajasthan',
  //     tz_id: 'Asia/Kolkata,',
  //   },
  // };

  constructor(private _router: Router, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    // console.log(this.weatherData);
  }

  onCardClick() {
    const location = this.weatherData.location.name.toLowerCase();
    this._router
      .navigate([location], {
        relativeTo: this._route,
      })
      .then(null);
  }
}
