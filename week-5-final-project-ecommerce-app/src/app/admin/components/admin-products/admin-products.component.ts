import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HELPERS } from '../../../shared/constants/helpers';
import { Product } from '../../../shared/constants/models/product.model';
import { FilterService } from '../../../shared/services/filter.service';
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

  /* Object to hold the loading state for update and delete operations and helpers object */
  pageProps = {
    loading: false,
    helpers: HELPERS,
  };

  categories = [
    'electronics',
    'jewelery',
    "men's clothing",
    "women's clothing",
  ];

  filterForm: FormGroup;
  /* Property used to show the clear filters button */
  filtersActive = false;

  constructor(
    private _data: FirebaseDataService,
    private _toast: ToastService,
    private _filters: FilterService
  ) {
    this.products = null;
    this.products$ = null;
    this.filterForm = new FormGroup({
      name: new FormControl(0),
      stock: new FormControl(null),
      status: new FormControl(null),
      category: new FormControl(null),
    });
  }

  /* Getter to return product title -> here denoted by name */
  get name() {
    return this.filterForm.get('name')?.value;
  }

  /* Getter to return product category */
  get category() {
    return this.filterForm.get('category')?.value;
  }

  /* Getter to return product stock status */
  get stock() {
    return this.filterForm.get('stock')?.value;
  }

  /* Getter to return product status -> disabled or not */
  get status() {
    return this.filterForm.get('status')?.value;
  }

  ngOnInit(): void {
    // Update the UI
    this.updateUI();
  }

  ngOnDestroy() {
    this.products$?.unsubscribe();
  }

  /* Method to activate filters and update UI */
  onFilterSubmit() {
    this.filtersActive = true;
    this.updateUI();
  }

  /* Method to clear filters and update UI */
  clearFilters() {
    this.filtersActive = false;
    this.filterForm.reset();
    this.updateUI();
  }

  /* Method to re-fetch data when there is an update */
  update() {
    this.updateUI();
  }

  /**
   * Method to update UI -> Fetch products, update loading and error states.
   * @private
   */
  private updateUI() {
    // Start loading
    this.pageProps.loading = true;
    this.products = null;
    // Fetch products
    this.products$ = this._data.getAllProducts().subscribe((products) => {
      // If products exist, set products state
      if (products) {
        this.products = this._filters.sortByTitle(products, 0);
        // Filter by name
        if (this.name !== null)
          this.products = this._filters.sortByTitle(this.products, +this.name);

        // Filter by stock
        if (this.stock != null)
          this.products = this._filters.byStock(this.stock, this.products);

        // Filter by status
        if (this.status != null)
          this.products = this.filterByStatus(this.status, this.products);

        // Filter by category
        if (this.category) {
          this.products = this.products.filter(
            (product) => product.category === this.category
          );
        }
        this._toast.showSuccessToast(`Found ${this.products.length} products.`);
      }
      // If there are no products
      else {
        this._toast.showErrorToast(
          this.pageProps.helpers.toast.message.NO_PRODUCTS_FOUND
        );
      }
    });
  }

  /**
   * Method to filter products based on status
   * @param {boolean} status
   * @param {Product[]} products
   * @returns {Product[]}
   * @private
   */
  private filterByStatus(status: boolean, products: Product[]) {
    if (!status) return products.sort((x, y) => +y.disabled - +x.disabled);
    return products.filter((product) => product.disabled);
  }
}
