import { NgModule } from '@angular/core';
import {
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { BackTrackGuard } from '../guards/backtrack/back-track.guard';
import { SubscriberGuard } from '../guards/subscriber/subscriber.guard';
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
import { MainComponent } from './main.component';

// Using AngularFireAuthGuard pipes
/* Redirect unauthorized users to login when checkout or wishlist pages are accessed */
const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo([APP_ROUTES.absolute.main.login]);
/* Stop LoggedIn users from accessing login and signup pages */
const redirectLoggedInToHome = () =>
  redirectLoggedInTo([APP_ROUTES.absolute.main.home]);

const mainAppRoutes: Routes = [
  {
    path: APP_ROUTES.relative.main.main,
    component: MainComponent,
    children: [
      {
        path: APP_ROUTES.relative.main.home,
        component: HomeComponent,
      },
      {
        path: APP_ROUTES.relative.main.products.list,
        component: ProductsListComponent,
      },
      {
        path: APP_ROUTES.relative.main.products.detail,
        component: ProductsDetailComponent,
      },
      {
        path: APP_ROUTES.relative.main.cart,
        component: CheckoutComponent,
        canActivate: [SubscriberGuard],
      },
      {
        path: APP_ROUTES.relative.main.wishlist,
        component: WishlistComponent,
        canActivate: [SubscriberGuard],
      },
      {
        path: APP_ROUTES.relative.main.login,
        component: LoginComponent,
        canActivate: [BackTrackGuard],
      },
      {
        path: APP_ROUTES.relative.main.signUp,
        component: SignupComponent,
        canActivate: [BackTrackGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainAppRoutes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
