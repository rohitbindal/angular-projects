import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from '../shared/constants/app-routes';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';

const authRoutes: Routes = [
  {
    path: APP_ROUTES.default,
    component: AdminHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
