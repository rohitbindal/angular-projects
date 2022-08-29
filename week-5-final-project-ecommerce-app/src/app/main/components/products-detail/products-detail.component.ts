import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/constants/product.model';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css'],
})
export class ProductsDetailComponent implements OnInit {
  product: Product | null;

  constructor(
    private _products: ProductService,
    private _route: ActivatedRoute
  ) {
    this.product = null;
  }

  ngOnInit(): void {
    const id = this._route.snapshot.params['id'];
    this.product = this._products.getProductById(id);
    console.log(this.product);
  }
}
