import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APP_ROUTES } from '../../../shared/constants/app-routes';
import { User } from '../../../shared/constants/authorization.model';
import { HELPERS } from '../../../shared/constants/helpers';
import { Product } from '../../../shared/constants/product.model';
import { FirebaseAuthService } from '../../../shared/services/firebase/auth.firebase.service';
import { FirebaseDataService } from '../../../shared/services/firebase/data.firebase.service';
import { ProductService } from '../../../shared/services/product.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css'],
})
export class ProductsDetailComponent implements OnInit, OnDestroy {
  product: Product | null;
  currentUser: User | null;
  private productDetail$: Subscription | null;

  constructor(
    private _products: ProductService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _data: FirebaseDataService,
    private _auth: FirebaseAuthService,
    private _toast: ToastService
  ) {
    this.product = null;
    this.productDetail$ = null;
    this.currentUser = null;
  }

  ngOnInit(): void {
    this._auth.user.subscribe((user) => {
      if (user) {
        this.currentUser = user;
      }
    });
    this.updateUI();
  }

  // Add the product to the cart
  onAddToCartClicked() {
    if (this.currentUser && !this.currentUser.disabled)
      this._data.addProductToCart(this.product!);
    else if (this.currentUser && this.currentUser.disabled)
      this._toast.showErrorToast(HELPERS.errors.ACCOUNT_DISABLED_BY_ADMIN);
    else
      this._toast.showErrorToast(HELPERS.errors.ACCOUNT_NEEDED_TO_ADD_TO_CART);
  }

  // Add to cart and navigate to checkout
  onBuyNowClicked() {
    if (this.currentUser && !this.currentUser.disabled) {
      this._data.addProductToCart(this.product!);
      this._router.navigate([APP_ROUTES.absolute.main.cart]).then();
    } else if (this.currentUser && this.currentUser.disabled)
      this._toast.showErrorToast(HELPERS.errors.ACCOUNT_DISABLED_BY_ADMIN);
    else
      this._toast.showErrorToast(HELPERS.errors.ACCOUNT_NEEDED_TO_ADD_TO_CART);
  }

  // Add the product to user wishlist
  onWishlistClicked() {
    if (this.currentUser && !this.currentUser.disabled)
      this._data.addProductToWishlist(this.product!);
    else if (this.currentUser && this.currentUser.disabled)
      this._toast.showErrorToast(HELPERS.errors.ACCOUNT_DISABLED_BY_ADMIN);
    else
      this._toast.showErrorToast(
        HELPERS.errors.ACCOUNT_NEEDED_TO_ADD_TO_WISHLIST
      );
  }

  ngOnDestroy() {
    this.productDetail$?.unsubscribe();
  }

  private updateUI() {
    const id = this._route.snapshot.params['id'];
    this.productDetail$ = this._products
      .getProductById(id)
      .subscribe((response) => {
        this.product = response;
        if (!this.product) {
          this._router.navigate([APP_ROUTES.absolute.pageNotFound]).then();
        }
      });
  }
}
