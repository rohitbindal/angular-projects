import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from '../shared/constants/app-routes';
import { HomeComponent } from './components/home/home.component';

const mainAppRoutes: Routes = [
  // TODO: Add child routes for details, list and landing page.
  { path: APP_ROUTES.relative.main.home, component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(mainAppRoutes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
