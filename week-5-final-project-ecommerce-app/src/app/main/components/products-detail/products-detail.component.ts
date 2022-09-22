import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APP_ROUTES } from '../../../shared/constants/app-routes';
import { HELPERS } from '../../../shared/constants/helpers';
import { User } from '../../../shared/constants/models/authorization.model';
import { Product } from '../../../shared/constants/models/product.model';
import { FirebaseAuthService } from '../../../shared/services/firebase/auth.firebase.service';
import { FirebaseDataService } from '../../../shared/services/firebase/data.firebase.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css'],
})
export class ProductsDetailComponent implements OnInit, OnDestroy {
  /* Property to hold product data */
  product: Product | null;

  /* Property to hold current user */
  currentUser: User | null;

  /* Property to hold related products */
  relatedProducts: Product[] | null;
  /* Property to hold sliderProducts */
  sliderProducts: Product[] | null;

  /* Property to store the current screen width */
  screenWidth: Number = window.innerWidth;
  /* Property to store screen breakpoint -> used to determine the number products to show together in the slider */
  screenBreakpoint = 1;

  /* Object to hold the loading states */
  pageProps = {
    pageLoading: false,
    cartUpdateLoading: false,
  };

  // Subscriptions
  private relatedProducts$: Subscription | null;
  private productDetail$: Subscription | null;
  private currentUser$: Subscription | null;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _data: FirebaseDataService,
    private _auth: FirebaseAuthService,
    private _toast: ToastService
  ) {
    this.product = null;
    this.productDetail$ = null;
    this.currentUser = null;
    this.currentUser$ = null;
    this.relatedProducts = null;
    this.relatedProducts$ = null;
    this.sliderProducts = null;
    this.getScreenSize();
  }

  ngOnInit(): void {
    this.currentUser$ = this._auth.user.subscribe((user) => {
      if (user) {
        this.currentUser = user;
      }
    });
    this.updateUI();
  }

  @HostListener('window:resize', ['$event'])
  /**
   * Method to get screen size, update breakpoint and slider products array
   * @param {Event} event
   */
  getScreenSize(event?: Event) {
    if (this.relatedProducts) {
      this.screenWidth = window.innerWidth;

      // Breakpoints
      if (this.screenWidth < 768) {
        this.screenBreakpoint = 1;
        this.sliderProducts = this.relatedProducts!.slice(
          0,
          this.screenBreakpoint
        );
      }

      if (this.screenWidth >= 768) {
        this.screenBreakpoint = 2;
        this.sliderProducts = this.relatedProducts!.slice(
          0,
          this.screenBreakpoint
        );
      }

      if (this.screenWidth >= 992) {
        this.screenBreakpoint = 3;
        this.sliderProducts = this.relatedProducts!.slice(
          0,
          this.screenBreakpoint
        );
      }
    }
  }

  /**
   * Method to add product to user cart
   */
  onAddToCartClicked() {
    // If the user is signed in and not disabled
    if (this.currentUser && !this.currentUser.disabled) {
      // Disabled action buttons based on loading state
      this.pageProps.cartUpdateLoading = true;
      // Add the product to cart
      this._data.addProductToCart(this.product!);

      // Wait for 1500ms to avoid button spamming
      setTimeout(() => {
        // Enable action buttons
        this.pageProps.cartUpdateLoading = false;
      }, 1500);
    }

    // If the user is signed in but disabled
    else if (this.currentUser && this.currentUser.disabled)
      this._toast.showErrorToast(HELPERS.errors.ACCOUNT_DISABLED_BY_ADMIN);
    // If user is not signed in
    else
      this._toast.showErrorToast(HELPERS.errors.ACCOUNT_NEEDED_TO_ADD_TO_CART);
  }

  /**
   * Method to add product to user cart and navigate to checkout page
   */
  onBuyNowClicked() {
    // If the user is signed in and not disabled
    if (this.currentUser && !this.currentUser.disabled) {
      // Disabled action buttons based on loading state
      this.pageProps.cartUpdateLoading = true;
      // Add the product to cart
      this._data.addProductToCart(this.product!);
      // Wait for 1500ms to avoid button spamming
      setTimeout(() => {
        // Enable action buttons
        this.pageProps.cartUpdateLoading = false;
        // Navigate to cart
        this._router.navigate([APP_ROUTES.absolute.main.cart]).then();
      }, 1500);
    }

    // If the user is signed in but disabled
    else if (this.currentUser && this.currentUser.disabled)
      this._toast.showErrorToast(HELPERS.errors.ACCOUNT_DISABLED_BY_ADMIN);
    // If user is not signed in
    else
      this._toast.showErrorToast(HELPERS.errors.ACCOUNT_NEEDED_TO_ADD_TO_CART);
  }

  /**
   * Method to add product to user wishlist
   */
  onWishlistClicked() {
    // If the user is signed in and not disabled
    if (this.currentUser && !this.currentUser.disabled)
      this._data.addProductToWishlist(this.product!);
    // If the user is signed in but disabled
    else if (this.currentUser && this.currentUser.disabled)
      this._toast.showErrorToast(HELPERS.errors.ACCOUNT_DISABLED_BY_ADMIN);
    // If user is not signed in
    else
      this._toast.showErrorToast(
        HELPERS.errors.ACCOUNT_NEEDED_TO_ADD_TO_WISHLIST
      );
  }

  ngOnDestroy() {
    this.productDetail$?.unsubscribe();
    this.relatedProducts$?.unsubscribe();
    this.currentUser$?.unsubscribe();
  }

  /**
   * Method to update detail view if a product in related products slider is clicked.
   */
  onProductClicked() {
    this.updateUI();
  }

  /**
   * Method to update UI -> Fetch products, update loading state.
   * Calls getRelatedProducts() to update related Products
   * @private
   */
  private updateUI() {
    // Start page loading
    this.pageProps.pageLoading = true;

    // Get product id from route params
    this._route.params.subscribe((params) => {
      const id = params['id'];

      // Get details using product id
      this.productDetail$ = this._data
        .getProductById(id)
        .subscribe((response) => {
          this.product = response;

          if (!this.product) {
            this._router.navigate([APP_ROUTES.absolute.pageNotFound]).then();
          }
          this.getRelatedProducts();
          this.pageProps.pageLoading = false;
        });
    });
  }

  /**
   * Method to get Related Products based on Category. Also calls getScreenSize() to update sliderProducts and breakpoint
   * @private
   */
  private getRelatedProducts() {
    // Get category
    const category = this.product?.category;
    // Fetch products of same category
    this.relatedProducts$ = this._data
      .getProductsByCategory(category!)
      .subscribe((response) => {
        this.relatedProducts = response;
        this.getScreenSize();
      });
  }
}
