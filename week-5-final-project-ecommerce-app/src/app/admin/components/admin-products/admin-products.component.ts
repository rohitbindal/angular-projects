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

  get name() {
    return this.filterForm.get('name')?.value;
  }

  get category() {
    return this.filterForm.get('category')?.value;
  }

  get stock() {
    return this.filterForm.get('stock')?.value;
  }

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

  onFilterSubmit() {
    //  TODO: Apply filters
    this.filtersActive = true;
    this.updateUI();
    // if (this.products)
    //   this.products = this._filters.sortByTitle(
    //     this.products.slice(),
    //     this.filterForm.get('name')?.value
    //   );
  }

  clearFilters() {
    this.filtersActive = false;
    this.filterForm.reset();
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

        if (this.name !== null)
          this.products = this._filters.sortByTitle(this.products, +this.name);
        // if(this.categories != null) this.products = this._filters.(products, this.name);
        if (this.stock != null)
          this.products = this._filters.byStock(this.stock, this.products);

        if (this.status != null)
          this.products = this.filterByStatus(this.status, this.products);

        if (this.category) {
          this.products = this.products.filter(
            (product) => product.category === this.category
          );
        }
        this._toast.showSuccessToast(`Found ${this.products.length} products.`);
      } else
        this._toast.showErrorToast(
          this.pageProps.helpers.toast.message.NO_PRODUCTS_FOUND
        );
    });
  }

  private filterByStatus(status: boolean, products: Product[]) {
    if (!status) return products.sort((x, y) => +y.disabled - +x.disabled);
    return products.filter((product) => product.disabled);
  }
}
