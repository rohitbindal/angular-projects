import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../../components/auth/login/login.component";
import {SignupComponent} from "../../components/auth/signup/signup.component";
import {APP_ROUTES} from "../../shared/constants/Routes";

const authRoutes: Routes = [
  {path: APP_ROUTES.DEFAULT, redirectTo: APP_ROUTES.absolute.LOGIN, pathMatch: 'full'},
  {path: APP_ROUTES.relative.LOGIN, component:LoginComponent},
  {path: APP_ROUTES.relative.SIGN_UP, component:SignupComponent},
]

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule{}
