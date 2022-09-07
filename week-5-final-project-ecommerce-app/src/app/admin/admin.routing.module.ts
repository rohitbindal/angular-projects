import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin/admin.guard';
import { APP_ROUTES } from '../shared/constants/app-routes';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminComponent } from './components/admin.component';

const authRoutes: Routes = [
  {
    path: APP_ROUTES.relative.admin.admin,
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: APP_ROUTES.relative.admin.home,
        component: AdminHomeComponent,
      },
      { path: APP_ROUTES.relative.admin.login, component: AdminLoginComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
