import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HELPERS } from '../../../../shared/constants/helpers';
import { Product } from '../../../../shared/constants/models/product.model';
import { FirebaseDataService } from '../../../../shared/services/firebase/data.firebase.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit, OnDestroy {
  /* Property to store array of products in user wishlist */
  wishlistProducts: Product[] | null;
  productList$: Subscription | null;
  helpers = HELPERS;

  /* Object to hold the loading state */
  pageProps = {
    loading: false,
  };

  constructor(private _data: FirebaseDataService) {
    this.wishlistProducts = null;
    this.productList$ = null;
  }

  ngOnInit(): void {
    this.updateUI();
  }

  /**
   * Method to delete an item from wishlist.
   * @param {string} id Product id
   * @param {number} index Index of the product in wishlistProducts array
   */
  onDeleteClicked(id: string, index: number) {
    // Ask for confirmation
    const conf = confirm('Are you sure ?');
    // If delete action is confirmed
    if (conf) {
      this._data.removeProductFromWishlist(id);
      this.wishlistProducts!.splice(index, 1);
      this.updateUI();
    }
  }

  ngOnDestroy() {
    this.productList$?.unsubscribe();
  }

  /**
   * Method to update UI -> Fetch wishlist products, update loading state and calculate total
   * @private
   */
  private updateUI() {
    // Start loading
    this.pageProps.loading = true;
    setTimeout(() => {
      this.productList$ = this._data.getWishlist().subscribe((data) => {
        this.wishlistProducts = data;
        this.pageProps.loading = false;
      });
    }, 600);
  }
}
