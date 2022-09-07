import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin.routing.module';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminComponent } from './components/admin.component';
import { UsersComponent } from './components/users/users.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';

@NgModule({
  declarations: [AdminComponent, AdminProductsComponent, UsersComponent, AdminHeaderComponent],
  imports: [SharedModule, AdminRoutingModule],
})
export class AdminModule {}
