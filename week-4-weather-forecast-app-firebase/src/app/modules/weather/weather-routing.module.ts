import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherDetailComponent } from '../../components/weather/weather-detail/weather-detail.component';
import { WeatherItemListComponent } from '../../components/weather/weather-item-list/weather-item-list.component';
import { WeatherComponent } from '../../components/weather/weather.component';
import { AuthGuard } from '../../guards/auth.guard';
import { APP_ROUTES } from '../../shared/constants/Routes';

const weatherRoutes: Routes = [
  {
    path: APP_ROUTES.relative.WEATHER,
    component: WeatherComponent,
    canActivate: [AuthGuard],
    children: [
      // Details Component
      {
        path: '',
        component: WeatherItemListComponent,
      },
      { path: ':location', component: WeatherDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(weatherRoutes)],
  exports: [RouterModule],
})
export class WeatherRoutingModule {}
