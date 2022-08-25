import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Forecastday } from 'src/app/models/forecast.model';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css'],
})
export class WeatherForecastComponent implements OnInit, OnDestroy {
  // Get the location as an input from the parent component
  @Input('location') location!: string;
  // Creating an Output property on the component to catch forecast click event
  @Output('forecastIndex') forecastIndex: EventEmitter<number> =
    new EventEmitter();

  forecastData?: Forecastday[];
  private forecastSubscription?: Subscription;

  constructor(private _weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getForecastData();
  }

  /**
   * Method to fetch the forecast data of the given city.
   */
  getForecastData() {
    if (this.location) {
      this.forecastSubscription = this._weatherService
        .forecast(this.location)
        .subscribe((response) => {
          this.forecastData = response;
        });
    }
  }

  /**
   *
   * @param index Index of the forecast clicked.
   * Emits an event with the index as its argument.
   */
  onForecastClicked(index: number) {
    this.forecastIndex?.emit(index);
  }

  ngOnDestroy(): void {
    // Unsubscribe from the forecast subscription
    this.forecastSubscription?.unsubscribe();
  }
}
