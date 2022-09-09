import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin.routing.module';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductsEditFormComponent } from './components/admin-products/products-edit-form/products-edit-form.component';
import { AdminComponent } from './components/admin.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminProductsComponent,
    UsersComponent,
    AdminHeaderComponent,
    ProductsEditFormComponent,
  ],
  imports: [SharedModule, AdminRoutingModule, ReactiveFormsModule],
  exports: [AdminProductsComponent],
})
export class AdminModule {}
