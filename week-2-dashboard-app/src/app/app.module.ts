import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AttributeBindingComponent } from './binding/attribute-binding/attribute-binding.component';
import { BindingComponent } from './binding/binding.component';
import { PropertyBindingComponent } from './binding/property-binding/property-binding.component';
import { ErrorHandlingComponent } from './error-handling/error-handling.component';
import { ErrorService } from './error-handling/error.service';
import { HeaderComponent } from './header/header.component';
import { ObservablesComponent } from './observables/observables.component';
import { PipesComponent } from './pipes-component/pipes.component';
import { SearchPipe } from './pipes-component/search.pipe';
import { ServicesComponent } from './services-component/services.component';

@NgModule({
  declarations: [
    AppComponent,
    ServicesComponent,
    ObservablesComponent,
    ErrorHandlingComponent,
    BindingComponent,
    HeaderComponent,
    PropertyBindingComponent,
    AttributeBindingComponent,
    PipesComponent,
    SearchPipe
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
