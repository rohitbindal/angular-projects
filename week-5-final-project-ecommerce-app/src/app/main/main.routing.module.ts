import { NgModule } from '@angular/core';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from '../shared/constants/app-routes';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import {
  ProductsDetailComponent
} from './components/products-detail/products-detail.component';
import {
  ProductsListComponent
} from './components/products-list/products-list.component';
import {
  CheckoutComponent
} from './components/secure/checkout/checkout.component';
import {
  WishlistComponent
} from './components/secure/wishlist/wishlist.component';

// Using AngularFireAuthGuard pipes
/* Redirect unauthorized users to login when checkout or wishlist pages are accessed */
const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo([APP_ROUTES.absolute.main.login]);
/* Stop LoggedIn users from accessing login and signup pages */
const redirectLoggedInToHome = () =>
  redirectLoggedInTo([APP_ROUTES.absolute.main.home]);

const mainAppRoutes: Routes = [

  {
    path: APP_ROUTES.relative.main.home,
    component: HomeComponent,
    children: [
      {
        path: APP_ROUTES.relative.main.products.list,
        component: ProductsListComponent,
      },
    ],
  },
  {
    path: APP_ROUTES.relative.main.products.detail,
    component: ProductsDetailComponent,
  },
  {
    path: APP_ROUTES.relative.main.checkout,
    component: CheckoutComponent,
    // Using canActivate helper from AngularFire to make the code readable
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: APP_ROUTES.relative.main.wishlist,
    component: WishlistComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: APP_ROUTES.relative.main.login,
    component: LoginComponent,
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: APP_ROUTES.relative.main.signUp,
    component: SignupComponent,
    ...canActivate(redirectLoggedInToHome),
  },
];

@NgModule({
            imports: [RouterModule.forChild(mainAppRoutes)],
            exports: [RouterModule],
          })
export class MainRoutingModule {}
