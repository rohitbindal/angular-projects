import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HELPERS } from '../../../shared/constants/helpers';
import { FiltersModel } from '../../../shared/constants/models/filters.model';
import { Product } from '../../../shared/constants/models/product.model';
import { FilterService } from '../../../shared/services/filter.service';
import { FirebaseDataService } from '../../../shared/services/firebase/data.firebase.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  /* Property to store array products */
  products: Product[] | null;

  /* Property to store products category */
  category: string | '';
  helpers = HELPERS;
  /* Property to store filter states */
  filters: FiltersModel;
  /* Property to hold page loading state */
  loading = false;

  private productList$: Subscription | null;

  constructor(
    private _data: FirebaseDataService,
    private _route: ActivatedRoute,
    private _filter: FilterService
  ) {
    this.products = null;
    this.category = '';
    this.productList$ = null;
    this.filters = {
      stock: false,
      rating: 0,
      price: [0, 0],
      sort: ['', ''],
      active: false,
    };
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      // Get category from route params
      this.category = params['category'];
      // Update UI
      this.updateUi();
    });
  }

  /**
   * Method to fetch products based on category. update page loading state and filter products
   */
  updateUi() {
    // Start loading
    this.loading = true;
    // Fetch products using category
    this.productList$ = this._data
      .getProductsByCategory(this.category)
      .subscribe((data) => {
        this.products = data;
        if (this.products) {
          // Filter products array
          const filteredProducts = this._filter.filterProducts(
            this.products,
            this.filters
          );
          this.products = filteredProducts.products;
          this.filters = filteredProducts.filters;
          // Stop loading
          this.loading = false;
        }
      });
  }

  /**
   * Method to clear all the applied filters.
   */
  clearFilters() {
    this.filters = {
      stock: false,
      rating: 0,
      price: [0, 0],
      sort: ['', ''],
      active: false,
    };
    this.updateUi();
  }

  /* Method to update UI when a filter is added */
  onChange() {
    this.updateUi();
  }

  ngOnDestroy() {
    this.productList$?.unsubscribe();
  }
}
