import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HELPERS } from '../../../../shared/constants/helpers';
import { Product } from '../../../../shared/constants/product.model';
import { FirebaseDataService } from '../../../../shared/services/firebase/data.firebase.service';
import { ProductService } from '../../../../shared/services/product.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit, OnDestroy {
  wishlistProducts: Product[] | null;
  productList$: Subscription | null;
  helpers = HELPERS;

  constructor(
    private _products: ProductService,
    private _data: FirebaseDataService
  ) {
    this.wishlistProducts = null;
    this.productList$ = null;
  }

  ngOnInit(): void {
    this.productList$ = this._data.getWishlist().subscribe((data) => {
      this.wishlistProducts = data;
    });
  }

  // TODO: Handle product Delete from wishlist -> Show a confirmation and delete the product
  onDeleteClicked() {}

  ngOnDestroy() {
    this.productList$?.unsubscribe();
  }
}
