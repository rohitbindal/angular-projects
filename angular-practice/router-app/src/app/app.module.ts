import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DetailsComponent } from './details/details.component';
import { AppRoutingModule } from './router/app-router.module';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    DetailsComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule  // <-- Adding our Router
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
