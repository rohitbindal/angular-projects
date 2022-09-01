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
  filters: FiltersModel | null;

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
    };
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.category = params['category'];
      this.updateUi();
    });
  }

  updateUi() {
    // TODO: replace the locally stored products with the products fetched from firebase.
    setTimeout(() => {
      this.productList$ = this._product
        .getProductsByCategory(this.category)
        .subscribe((data) => {
          this.products = data;
          // if (this.products) {
          this.filterProducts();
          // }
        });
    }, 1000);
  }

  onChange() {
    this.updateUi();
  }

  ngOnDestroy() {
    this.productList$?.unsubscribe();
  }

  private filterProducts() {
    if (this.products) {
      // Filter out the products based on stack
      if (this.filters?.stock)
        this.products = this._filter.byStock(this.filters.stock, this.products);

      // Filter out the products with appropriate rating
      if (this.filters?.rating)
        this.products = this._filter.byRating(
          this.filters.rating,
          this.products
        );

      // Filter out the products with appropriate price
      // index 0, 1 --> lower and upper limit respectively
      if (this.filters?.price[1])
        this.products = this._filter.byPrice(this.filters.price, this.products);

      // Sort the products base on name, price and rating
      if (this.filters?.sort[0])
        this.products = this._filter.sortProducts(
          this.filters.sort,
          this.products
        );
    }
  }
}
