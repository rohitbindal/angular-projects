import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from '../shared/constants/app-routes';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminComponent } from './components/admin.component';

const authRoutes: Routes = [
  //TODO: Add routes for login and protect home route
  {
    path: APP_ROUTES.relative.admin.admin,
    component: AdminComponent,
    children: [
      { path: APP_ROUTES.relative.admin.home, component: AdminHomeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
