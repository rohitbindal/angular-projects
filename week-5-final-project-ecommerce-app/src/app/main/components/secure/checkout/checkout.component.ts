import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../../shared/constants/product.model';
import { FirebaseDataService } from '../../../../shared/services/firebase/data.firebase.service';
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

  constructor(
    private _products: ProductService,
    private _data: FirebaseDataService
  ) {
    this.checkoutProducts = null;
    this.checkoutSubscription$ = null;
  }

  ngOnInit(): void {
    this.checkoutSubscription$ = this._data.getCart().subscribe((data) => {
      this.checkoutProducts = data;
      // Calculate the total
      this.total = this.getTotal(this.checkoutProducts);
    });
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
