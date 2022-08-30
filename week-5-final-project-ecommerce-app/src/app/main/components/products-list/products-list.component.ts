import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HELPERS } from '../../../shared/constants/helpers';
import { Product } from '../../../shared/constants/product.model';
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
  stock = false;
  rating = 0;
  price = [0, 0];
  sort = ['', ''];

  private productList$: Subscription | null;

  constructor(
    private _product: ProductService,
    private _route: ActivatedRoute
  ) {
    this.products = null;
    this.category = '';
    this.productList$ = null;
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

          // Filter out the products based on stack
          if (!this.stock) this.products.sort((x, y) => +y.stock - +x.stock);
          else this.products = this.products.filter((product) => product.stock);

          // Filter out the products with appropriate rating
          if (this.rating)
            this.products = this.products.filter(
              (product) => product.rating.rate >= this.rating
            );

          // Filter out the products with appropriate price
          // index 0, 1 --> lower and upper limit respectively
          if (this.price[1])
            this.products = this.products.filter(
              (product) =>
                product.price < this.price[1] && product.price >= this.price[0]
            );

          // Sorting
          if (this.sort[0]) this.sortProducts();
        });
    }, 1000);
    // Sort the products based on stock
  }

  onChange() {
    this.updateUi();
  }

  ngOnDestroy() {
    this.productList$?.unsubscribe();
  }

  private sortProducts() {}
}
