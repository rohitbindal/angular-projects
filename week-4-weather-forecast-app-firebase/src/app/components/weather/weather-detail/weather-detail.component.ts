import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observer, Subscription } from 'rxjs';
import { WeatherService } from '../../../services/weather/weather.service';
import { WeatherForecast } from '../../../shared/forecast.model';

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css'],
})
export class WeatherDetailComponent implements OnInit {
  isLoading: boolean;
  error: string;
  location: string;

  detailsIndex: number;
  isSelected: boolean;
  selectedIndex: number;

  weather: WeatherForecast | null;
  private weatherSub$: Subscription | null;

  constructor(
    private _route: ActivatedRoute,
    private _weather: WeatherService
  ) {
    this.isLoading = false;
    this.error = '';
    this.weatherSub$ = null;
    this.location = '';
    this.weather = null;
    this.detailsIndex = 0;
    this.isSelected = false;
    this.selectedIndex = 0;
  }

  ngOnInit(): void {
    const locationIsDefined = this._route.snapshot.paramMap.has('location');
    if (locationIsDefined) {
      this.location = this._route.snapshot.paramMap.get('location')!;
      this.getForecast();
    } else {
      //  TODO: Show Error
    }
  }

  getForecast() {
    if (!this.location) return;
    this.isLoading = true;
    const observer: Observer<WeatherForecast> = {
      next: (response: WeatherForecast) => {
        this.weather = response;

        this.isLoading = false;
      },
      error: (error) => {
        this.error = error;

        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    };
    this.weatherSub$ = this._weather
      .forecast(this.location)
      .subscribe(observer);
  }

  changeDetails(index: number, el: HTMLElement) {
    el.scrollIntoView();
    this.detailsIndex = index;
    this.isSelected = true;
    this.selectedIndex = index;
  }
}
