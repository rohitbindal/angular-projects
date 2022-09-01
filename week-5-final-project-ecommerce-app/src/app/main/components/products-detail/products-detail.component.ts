import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APP_ROUTES } from '../../../shared/constants/app-routes';
import { Product } from '../../../shared/constants/product.model';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css'],
})
export class ProductsDetailComponent implements OnInit, OnDestroy {
  product: Product | null;

  private productDetail$: Subscription | null;

  constructor(
    private _products: ProductService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.product = null;
    this.productDetail$ = null;
  }

  ngOnInit(): void {
    const id = this._route.snapshot.params['id'];
    // TODO: replace the locally stored product with the product fetched from firebase.
    this.productDetail$ = this._products
      .getProductById(id)
      .subscribe((response) => {
        setTimeout(() => {
          this.product = response;
          if (!this.product) {
            this._router.navigate([APP_ROUTES.absolute.pageNotFound]).then();
          }
        }, 600);
      });
  }

  // TODO: Cart, Checkout and Wishlist actions
  // Add the product to the cart
  onAddToCartClicked() {}

  // Add to cart and navigate to checkout
  onBuyNowClicked() {
    this._router.navigate([APP_ROUTES.absolute.main.checkout]).then();
  }

  // Add the product to user wishlist
  onWishlistClicked() {}

  ngOnDestroy() {
    this.productDetail$?.unsubscribe();
  }
}
