import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {WeatherComponent} from "../../components/weather/weather.component";
import {APP_ROUTES} from "../../shared/constants/Routes";

const weatherRoutes:Routes = [
  {path: APP_ROUTES.relative.WEATHER, component: WeatherComponent}
]

@NgModule({
  imports: [RouterModule.forChild(weatherRoutes)],
  exports:[RouterModule]
})
export class WeatherRoutingModule{}
