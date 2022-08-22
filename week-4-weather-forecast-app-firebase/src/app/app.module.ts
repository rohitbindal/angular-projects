import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {
  AppRoutingModule
} from "./modules/app-routing/app-routing.module";
import {
  AuthenticationModule
} from "./modules/authentication/authentication.module";
import {
  WeatherModule
} from "./modules/weather/weather.module";
import {
  PageNotFoundComponent
} from './components/page-not-found/page-not-found.component';
import {
  HeaderComponent
} from './components/header/header.component';
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./modules/shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AuthenticationModule,
    WeatherModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
