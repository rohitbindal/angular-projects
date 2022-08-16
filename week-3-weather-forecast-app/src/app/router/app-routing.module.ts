import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { ROUTES_PATH } from '../constants/routes';

const appRoutes: Route[] = [
  {
    // Home Component
    path: ROUTES_PATH.relative.HOME,
    component: HomeComponent,
  },
  {
    // Page Not Found Component
    path: ROUTES_PATH.relative.PAGE_NOT_FOUND,
    component: PageNotFoundComponent,
  },
  {
    // Empty Path
    path: ROUTES_PATH.EMPTY,
    redirectTo: ROUTES_PATH.absolute.HOME, // --> Redirect to home if the url is empty
    pathMatch: 'full',
  },
  {
    // Redirect to the Page not Found component if the Route doesn't exists.
    path: '**',
    redirectTo: ROUTES_PATH.absolute.PAGE_NOT_FOUND,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
