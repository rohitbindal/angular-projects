import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AntDesignModule } from './modules/ant-design.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AntDesignModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
