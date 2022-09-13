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
  wishlistProducts: Product[] | null;
  productList$: Subscription | null;
  helpers = HELPERS;
  pageProps = {
    loading: false,
    error: '',
    username: '',
  };

  constructor(private _data: FirebaseDataService) {
    this.wishlistProducts = null;
    this.productList$ = null;
  }

  ngOnInit(): void {
    this.updateUI();
  }

  onDeleteClicked(id: number, index: number) {
    const conf = confirm('Are you sure ?');
    if (conf) {
      this._data.removeProductFromWishlist(id);
      this.wishlistProducts!.splice(index, 1);
      this.updateUI();
    }
  }

  ngOnDestroy() {
    this.productList$?.unsubscribe();
  }

  private updateUI() {
    this.pageProps.loading = true;
    setTimeout(() => {
      this.productList$ = this._data.getWishlist().subscribe((data) => {
        this.wishlistProducts = data;
        this.pageProps.loading = false;
      });
    }, 600);
  }
}
