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
    this.productList$ = this._route.params.subscribe((params) => {
      this.category = params['category'];
      this.updateUi();
    });
  }

  updateUi() {
    // TODO: replace the locally stored products with the products fetched from firebase.
    setTimeout(() => {
      this._product.getProductsByCategory(this.category).subscribe((data) => {
        this.products = data;
        this.products.sort((x, y) => +y.stock - +x.stock);
      });
    }, 4000);
    // Sort the products based on stock
  }

  ngOnDestroy() {
    this.productList$?.unsubscribe();
  }
}
