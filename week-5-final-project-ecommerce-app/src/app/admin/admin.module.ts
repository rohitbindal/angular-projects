import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin.routing.module';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminComponent } from './components/admin.component';

@NgModule({
  declarations: [AdminComponent, AdminHomeComponent, AdminLoginComponent],
  imports: [SharedModule, AdminRoutingModule],
})
export class AdminModule {}
