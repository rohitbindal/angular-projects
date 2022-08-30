import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HELPERS } from '../../../shared/constants/helpers';
import { Product } from '../../../shared/constants/product.model';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products: Product[] | null;
  category: string | '';
  helpers = HELPERS;

  constructor(
    private _product: ProductService,
    private _route: ActivatedRoute
  ) {
    this.products = null;
    this.category = '';
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.category = params['category'];
      this.updateUi();
    });
  }

  updateUi() {
    // TODO: replace the locally stored products with the products fetched from firebase.
    this.products = this._product.getProductsByCategory(this.category);
    // Sort the products based on stock
    this.products.sort((x, y) => +y.stock - +x.stock);
  }
}
