import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ObservablesComponent } from './observables/observables.component';
import { ErrorHandlingComponent } from './error-handling/error-handling.component';
import { BindingComponent } from './binding/binding.component';
import { ServicesComponent } from './services-component/services.component';
import { HeaderComponent } from './header/header.component';
import { PropertyBindingComponent } from './binding/property-binding/property-binding.component';
import { AttributeBindingComponent } from './binding/attribute-binding/attribute-binding.component';
import { FormsModule } from '@angular/forms';
import { ErrorService } from './error-handling/error.service';

@NgModule({
  declarations: [
    AppComponent,
    ServicesComponent,
    ObservablesComponent,
    ErrorHandlingComponent,
    BindingComponent,
    HeaderComponent,
    PropertyBindingComponent,
    AttributeBindingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [{
    provide: ErrorHandler, useClass: ErrorService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
