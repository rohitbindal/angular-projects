import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from '../../components/weather/weather.component';
import { AuthGuard } from '../../guards/auth.guard';
import { APP_ROUTES } from '../../shared/constants/Routes';

const weatherRoutes: Routes = [
  {
    path: APP_ROUTES.DEFAULT,
    component: WeatherComponent,
    canActivate: [AuthGuard],
    // children: [
    // Details Component
    //   {path: ':location'}
    // ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(weatherRoutes)],
  exports: [RouterModule],
})
export class WeatherRoutingModule {}
