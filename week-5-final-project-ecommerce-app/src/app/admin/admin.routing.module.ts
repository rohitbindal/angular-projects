import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin/admin.guard';
import { APP_ROUTES } from '../shared/constants/app-routes';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminComponent } from './components/admin.component';
import { UsersComponent } from './components/users/users.component';

const authRoutes: Routes = [
  {
    path: APP_ROUTES.relative.admin.admin,
    redirectTo: APP_ROUTES.absolute.admin.products,
    pathMatch: 'full',
  },
  {
    path: APP_ROUTES.relative.admin.admin,
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: APP_ROUTES.relative.admin.products,
        component: AdminProductsComponent,
      },
      {
        path: APP_ROUTES.relative.admin.users,
        component: UsersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
