import { NgModule } from '@angular/core';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminComponent } from './components/admin.component';

@NgModule({
  declarations: [AdminComponent, AdminHomeComponent, AdminLoginComponent],
})
export class AdminModule {}
