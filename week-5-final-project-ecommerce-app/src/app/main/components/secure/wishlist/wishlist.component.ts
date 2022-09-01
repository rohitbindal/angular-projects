import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HELPERS } from '../../../../shared/constants/helpers';
import { Product } from '../../../../shared/constants/product.model';
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

  constructor(private _products: ProductService) {
    this.wishlistProducts = null;
    this.productList$ = null;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.productList$ = this._products.getAllProducts().subscribe((data) => {
        this.wishlistProducts = data;
      });
    }, 1000);
  }

  // TODO: Handle product Delete from wishlist -> Show a confirmation and delete the product
  onDeleteClicked() {}

  ngOnDestroy() {
    this.productList$?.unsubscribe();
  }
}
