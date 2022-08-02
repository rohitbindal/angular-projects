import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ObservablesComponent } from './observables/observables.component';
import { ErrorHandlingComponent } from './error-handling/error-handling.component';
import { DependencyInjectionComponent } from './dependency-injection/dependency-injection.component';
import { BindingComponent } from './binding/binding.component';
import { ServicesComponent } from './services-component/services.component';

@NgModule({
  declarations: [
    AppComponent,
    ServicesComponent,
    ObservablesComponent,
    ErrorHandlingComponent,
    DependencyInjectionComponent,
    BindingComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
