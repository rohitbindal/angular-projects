import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../components/auth/login/login.component';
import { SignupComponent } from '../../components/auth/signup/signup.component';
import { AuthBacktrackGuard } from '../../guards/auth-backtrack.guard';
import { APP_ROUTES } from '../../shared/constants/Routes';

const authRoutes: Routes = [
  {
    path: APP_ROUTES.DEFAULT,
    component: LoginComponent,
    canActivate: [AuthBacktrackGuard],
  },
  {
    path: APP_ROUTES.relative.SIGN_UP,
    component: SignupComponent,
    canActivate: [AuthBacktrackGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
