import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../../shared/constants/models/authorization.model';
import {
  Order,
  Product,
} from '../../../../shared/constants/models/product.model';
import { FirebaseAuthService } from '../../../../shared/services/firebase/auth.firebase.service';
import { FirebaseDataService } from '../../../../shared/services/firebase/data.firebase.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  /* Property to store array of products in cart */
  checkoutProducts: Product[] | null;
  checkoutSubscription$: Subscription | null;
  /* Object to store the currently signed-in user */
  user: User | null;
  userSub$: Subscription | null;
  /* Property to store cart total */
  total = 0;

  /* Object to hold the loading states */
  pageProps = {
    loading: false,
  };

  constructor(
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
      // Create a new order object
      const order: Order = {
        uid: this.user?.uid,
        total: this.getTotal(this.checkoutProducts),
        products: this.checkoutProducts,
      };
      // Generate order
      this._data.generateOrder(order);
    }
  }

  /**
   * Method to delete an item from cart.
   * @param {number} index Index of the product in checkoutProducts array
   * @param {string} id Id of the product
   */
  onDeleteClicked(index: number, id: string) {
    // Ask for confirmation
    const conf = confirm('Are you sure ?');
    // If there are products in cart and the delete action is confirmed
    if (conf && this.checkoutProducts) {
      // Update products count
      let count = this.checkoutProducts[index].count;
      if (count) count = count * -1;

      // Remove from cart
      this._data.removeProductFromCart(id, count);
      // Remove from checkoutProducts array
      this.checkoutProducts!.splice(index, 1);
      // Re-fetch the data and update UI.
      this.updateUI();
    }
  }

  /* Method re-fetch data on quantity change */
  onQtyUpdate() {
    this.updateUI();
  }

  /**
   * Method to update UI -> Fetch cart products, update loading state and calculate total
   * @private
   */
  private updateUI() {
    // Start loading
    this.pageProps.loading = true;
    setTimeout(() => {
      this.checkoutSubscription$ = this._data.getCart().subscribe((data) => {
        this.checkoutProducts = data;
        // Calculate the total
        this.total = this.getTotal(this.checkoutProducts);
        // Stop loading
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
