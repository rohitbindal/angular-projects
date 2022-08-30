import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_ROUTES } from '../../../shared/constants/app-routes';
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
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.product = null;
  }

  ngOnInit(): void {
    const id = this._route.snapshot.params['id'];
    this.product = this._products.getProductById(id);
    if (!this.product) {
      this._router.navigate([APP_ROUTES.absolute.pageNotFound]).then();
    }
  }
}
