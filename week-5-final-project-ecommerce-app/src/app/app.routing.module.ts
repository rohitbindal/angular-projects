import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { APP_ROUTES } from './shared/constants/app-routes';

const appRoutes: Routes = [
  {
    path: APP_ROUTES.relative.main.main,
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
  {
    path: APP_ROUTES.relative.admin.admin,
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: APP_ROUTES.default,
    redirectTo: APP_ROUTES.absolute.main.home,
    pathMatch: 'full',
  },
  { path: APP_ROUTES.relative.pageNotFound, component: PageNotFoundComponent },
  {
    path: '**',
    redirectTo: APP_ROUTES.absolute.pageNotFound,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
