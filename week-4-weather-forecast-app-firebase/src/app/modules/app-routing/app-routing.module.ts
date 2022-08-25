import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {
  PageNotFoundComponent
} from "../../components/page-not-found/page-not-found.component";
import {APP_ROUTES} from "../../shared/constants/Routes";

const appRoutes: Routes = [
  {
    path: APP_ROUTES.DEFAULT,
    redirectTo: APP_ROUTES.absolute.WEATHER,
    pathMatch: 'full'
  },
  // Lazy Loading the modules below.
  {
    path: APP_ROUTES.relative.WEATHER,
    loadChildren: () =>
      import('../../modules/weather/weather.module').then(m => m.WeatherModule)
  },
  {
    path: APP_ROUTES.relative.LOGIN,
    loadChildren: () =>
      import('../../modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: APP_ROUTES.relative.PAGE_NOT_FOUND,
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: APP_ROUTES.absolute.PAGE_NOT_FOUND
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
