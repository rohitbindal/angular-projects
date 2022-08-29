import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductsDetailComponent } from './components/products-detail/products-detail.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { CheckoutComponent } from './components/secure/checkout/checkout.component';
import { WishlistComponent } from './components/secure/wishlist/wishlist.component';
import { MainRoutingModule } from './main.routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    ProductItemComponent,
    ProductsListComponent,
    ProductsDetailComponent,
    CheckoutComponent,
    WishlistComponent,
    HeaderComponent,
  ],
  imports: [MainRoutingModule, SharedModule, FormsModule],
})
export class MainModule {}
