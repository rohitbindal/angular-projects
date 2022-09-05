import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FiltersModel } from '../../../shared/constants/filters.model';
import { HELPERS } from '../../../shared/constants/helpers';
import { Product } from '../../../shared/constants/product.model';
import { FilterService } from '../../../shared/services/filter.service';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] | null;
  category: string | '';
  helpers = HELPERS;
  filters: FiltersModel;
  loading = false;

  private productList$: Subscription | null;

  constructor(
    private _product: ProductService,
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
      this.category = params['category'];
      this.updateUi();
    });
  }

  updateUi() {
    this.loading = true;
    this.productList$ = this._product
      .getProductsByCategory(this.category)
      .subscribe((data) => {
        this.products = data;
        if (this.products) {
          const filteredProducts = this._filter.filterProducts(
            this.products,
            this.filters
          );
          this.products = filteredProducts.products;
          this.filters = filteredProducts.filters;
          this.loading = false;
        }
      });
  }

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

  onChange() {
    this.updateUi();
  }

  ngOnDestroy() {
    this.productList$?.unsubscribe();
  }
}
