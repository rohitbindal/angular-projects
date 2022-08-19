import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PageNotFoundComponent} from "../../components/page-not-found/page-not-found.component";
import {APP_ROUTES} from "../../shared/constants/Routes";

const appRoutes: Routes = [
  {path: APP_ROUTES.relative.PAGE_NOT_FOUND, component: PageNotFoundComponent},
  // {path: '', redirectTo: APP_ROUTES.DEFAULT, pathMatch: 'full'},
  {path: '**', redirectTo: APP_ROUTES.absolute.PAGE_NOT_FOUND}
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
