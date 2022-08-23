import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherDetailComponent } from '../../components/weather/weather-detail/weather-detail.component';
import { WeatherForecastItemComponent } from '../../components/weather/weather-forecast-item/weather-forecast-item.component';
import { WeatherItemComponent } from '../../components/weather/weather-item/weather-item.component';
import { WeatherComponent } from '../../components/weather/weather.component';
import { SharedModule } from '../shared/shared.module';
import { WeatherRoutingModule } from './weather-routing.module';

@NgModule({
  declarations: [
    WeatherComponent,
    WeatherItemComponent,
    WeatherDetailComponent,
    WeatherForecastItemComponent,
  ],
  imports: [CommonModule, WeatherRoutingModule, FormsModule, SharedModule],
})
export class WeatherModule {}
