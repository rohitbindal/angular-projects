import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../../shared/constants/models/authorization.model';
import {
  Order,
  Product,
} from '../../../../shared/constants/models/product.model';
import { FirebaseAuthService } from '../../../../shared/services/firebase/auth.firebase.service';
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
  /* Object to store the currently signed-in user */
  user: User | null;
  userSub$: Subscription | null;
  total = 0;
  pageProps = {
    loading: false,
    error: '',
  };

  constructor(
    private _products: ProductService,
    private _data: FirebaseDataService,
    private _auth: FirebaseAuthService
  ) {
    this.checkoutProducts = null;
    this.checkoutSubscription$ = null;
    this.user = null;
    this.userSub$ = null;
  }

  ngOnInit(): void {
    // Get the currently signed-in user.
    this.userSub$ = this._auth.user.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
    this.updateUI();
  }

  ngOnDestroy() {
    this.checkoutSubscription$?.unsubscribe();
    this.userSub$?.unsubscribe();
  }

  /**
   * Method to place order
   */
  onPlaceOrderClicked() {
    // Check if the user exists and there are products in the cart.
    if (this.user && this.checkoutProducts) {
      const order: Order = {
        uid: this.user?.uid,
        total: this.getTotal(this.checkoutProducts),
        products: this.checkoutProducts,
      };

      this._data.generateOrder(order);
    }
  }

  onDeleteClicked(index: number, id: number) {
    const conf = confirm('Are you sure ?');
    if (conf && this.checkoutProducts) {
      let count = this.checkoutProducts[index].count;
      if (count) count = count * -1;
      this._data.removeProductFromCart(id, count);
      this.checkoutProducts!.splice(index, 1);
      this.updateUI();
    }
  }

  onQtyUpdate() {
    this.updateUI();
  }

  private updateUI() {
    this.pageProps.loading = true;
    setTimeout(() => {
      this.checkoutSubscription$ = this._data.getCart().subscribe((data) => {
        this.checkoutProducts = data;
        // Calculate the total
        this.total = this.getTotal(this.checkoutProducts);
        this.pageProps.loading = false;
      });
    }, 600);
  }

  /**
   * Method to calculate the total order value
   * @param {Product[]} products
   * @returns {number}
   * @private
   */
  private getTotal(products: Product[]) {
    return products
      .map((product) => product.price * (product.count ? product.count : 1))
      .reduce((prev, next) => prev + next, 0);
  }
}
