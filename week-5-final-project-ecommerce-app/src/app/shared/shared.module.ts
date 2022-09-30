import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductItemComponent } from '../main/components/product-item/product-item.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ProductsSliderComponent } from './components/products-slider/products-slider.component';
import { ToastComponent } from './components/toaster/toast/toast.component';
import { ToasterComponent } from './components/toaster/toaster.component';

@NgModule({
  declarations: [
    LoaderComponent,
    ToasterComponent,
    ToastComponent,
    ProductsSliderComponent,
    ProductItemComponent,
  ],
  imports: [CommonModule],
  exports: [
    LoaderComponent,
    CommonModule,
    ToasterComponent,
    ProductItemComponent,
    ProductsSliderComponent,
  ],
})
export class SharedModule {}
