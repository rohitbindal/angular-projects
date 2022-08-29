import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from '../shared/constants/app-routes';
import { HomeComponent } from './components/home/home.component';
import { ProductsDetailComponent } from './components/products-detail/products-detail.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { CheckoutComponent } from './components/secure/checkout/checkout.component';
import { WishlistComponent } from './components/secure/wishlist/wishlist.component';

const mainAppRoutes: Routes = [
  // TODO: Add child routes for landing page.
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
    // TODO: Add guard and user id as a parameter
    path: APP_ROUTES.relative.main.checkout,
    component: CheckoutComponent,
  },
  {
    // TODO: Add guard and user id as a parameter
    path: APP_ROUTES.relative.main.wishlist,
    component: WishlistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainAppRoutes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
