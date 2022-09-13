import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackTrackGuard } from '../guards/backtrack/back-track.guard';
import { MainRouteGuard } from '../guards/main-route/main-route.guard';
import { SubscriberGuard } from '../guards/subscriber/subscriber.guard';
import { APP_ROUTES } from '../shared/constants/app-routes';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsDetailComponent } from './components/products-detail/products-detail.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { CheckoutComponent } from './components/secure/checkout/checkout.component';
import { WishlistComponent } from './components/secure/wishlist/wishlist.component';
import { MainComponent } from './main.component';

const mainAppRoutes: Routes = [
  {
    path: APP_ROUTES.relative.main.main,
    redirectTo: APP_ROUTES.absolute.main.home,
    pathMatch: 'full',
  },
  {
    path: APP_ROUTES.relative.main.main,
    component: MainComponent,
    children: [
      {
        path: APP_ROUTES.relative.main.home,
        component: HomeComponent,
        canActivate: [MainRouteGuard],
      },
      {
        path: APP_ROUTES.relative.main.products.list,
        component: ProductsListComponent,
        canActivate: [MainRouteGuard],
      },
      {
        path: APP_ROUTES.relative.main.products.detail,
        component: ProductsDetailComponent,
        canActivate: [MainRouteGuard],
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
