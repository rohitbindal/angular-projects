import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { FirebaseModule } from './shared/firebase/firebase.module';
import { StoreModule } from './store/store.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AdminModule,
    StoreModule,
    FirebaseModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
