import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HELPERS } from '../../constants/helpers';
import { Product } from '../../constants/models/product.model';

@Component({
  selector: 'app-products-slider',
  templateUrl: './products-slider.component.html',
  styleUrls: ['./products-slider.component.css'],
})
export class ProductsSliderComponent implements OnInit {
  @Input('sliderProducts') sliderProducts: Product[] | null;
  @Input('relatedProducts') relatedProducts: Product[] | null;
  @Input('screenBreakpoint') screenBreakpoint!: number;
  @Output('productClicked') clicked = new EventEmitter();
  index = 2;
  helpers = HELPERS;

  constructor(private _router: Router) {
    this.relatedProducts = null;
    this.sliderProducts = null;
  }

  ngOnInit(): void {}

  onNextClicked() {
    if (this.relatedProducts && this.sliderProducts) {
      if (this.index < this.relatedProducts.length - 1) {
        this.sliderProducts?.shift();
        this.sliderProducts?.push(this.relatedProducts[this.index + 1]);
        this.index++;
      }
    }
  }

  onBackClicked() {
    if (this.relatedProducts && this.sliderProducts) {
      if (this.index > 2) {
        this.sliderProducts?.pop();
        this.sliderProducts?.unshift(
          this.relatedProducts[this.index - this.screenBreakpoint]
        );
        this.index--;
      }
    }
  }

  onProductClicked(id: number) {
    this._router
      .navigate([this.helpers.routing.detailsRouteAbsolute + '/' + id])
      .then();
    this.clicked.emit();
  }
}
