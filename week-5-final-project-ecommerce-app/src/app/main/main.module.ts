import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsDetailComponent } from './components/products-detail/products-detail.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { CheckoutItemComponent } from './components/secure/checkout/checkout-item/checkout-item.component';
import { CheckoutComponent } from './components/secure/checkout/checkout.component';
import { WishlistComponent } from './components/secure/wishlist/wishlist.component';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main.routing.module';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    ProductsListComponent,
    ProductsDetailComponent,
    CheckoutComponent,
    WishlistComponent,
    HeaderComponent,
    CheckoutItemComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [MainRoutingModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class MainModule {}
