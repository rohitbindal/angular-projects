import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../../shared/constants/product.model';
import { ProductService } from '../../../../shared/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  checkoutProducts: Product[] | null;
  checkoutSubscription$: Subscription | null;
  total = 0;

  constructor(private _products: ProductService) {
    this.checkoutProducts = null;
    this.checkoutSubscription$ = null;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.checkoutSubscription$ = this._products
        .getAllProducts()
        .subscribe((data) => {
          this.checkoutProducts = data.slice(0, 3);
          // Calculate the total
          this.total = this.getTotal(this.checkoutProducts);
          console.log(this.total);
        });
    }, 1000);
  }

  ngOnDestroy() {
    this.checkoutSubscription$?.unsubscribe();
  }

  // TODO: Handle Place orders.
  onPlaceOrderClicked() {}

  /**
   * Method to calculate the total order value
   * @param {Product[]} products
   * @returns {number}
   * @private
   */
  private getTotal(products: Product[]) {
    return products
      .map((product) => product.price)
      .reduce((prev, next) => prev + next, 0);
  }
}
