import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HELPERS } from '../../../shared/constants/helpers';
import { Product } from '../../../shared/constants/product.model';
import { FirebaseDataService } from '../../../shared/services/firebase/data.firebase.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  /* Array of Products */
  products: Product[] | null;
  /* Property to hold the subscription */
  products$: Subscription | null;
  pageProps = {
    loading: false,
    helpers: HELPERS,
  };

  constructor(
    private _data: FirebaseDataService,
    private _toast: ToastService
  ) {
    this.products = null;
    this.products$ = null;
  }

  ngOnInit(): void {
    // Update the UI
    this.updateUI();
  }

  ngOnDestroy() {
    this.products$?.unsubscribe();
  }

  /**
   * Method to update UI -> Fetch products, update loading and error states.
   * @private
   */
  private updateUI() {
    // Start loading
    this.pageProps.loading = true;
    // Fetch products
    this.products$ = this._data.getAllProducts().subscribe((products) => {
      // If products exist, set products state
      if (products) this.products = products;
      // If not, show error
      else
        this._toast.showErrorToast(
          this.pageProps.helpers.toast.message.NO_PRODUCTS_FOUND
        );
    });
  }
}
