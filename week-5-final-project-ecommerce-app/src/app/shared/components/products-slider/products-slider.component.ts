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

  /* Property to hold the current index of product for slider */
  index = 2;
  helpers = HELPERS;

  constructor(private _router: Router) {
    this.relatedProducts = null;
    this.sliderProducts = null;
  }

  ngOnInit(): void {}

  /**
   * Method to update the slider products array and index when next is clicked
   */
  onNextClicked() {
    if (this.relatedProducts && this.sliderProducts) {
      // If not the last element of the array
      if (this.index < this.relatedProducts.length - 1) {
        // Remove the first product from sliderProducts array
        this.sliderProducts?.shift();

        // Insert a new product at the end of sliderProducts array
        this.sliderProducts?.push(this.relatedProducts[this.index + 1]);
        this.index++;
      }
    }
  }

  /**
   * Method to update the slider products array and index when back is clicked
   */
  onBackClicked() {
    if (this.relatedProducts && this.sliderProducts) {
      // If not third element of the array -> At-least two products must be shown all the time
      if (this.index > 2) {
        // remove the last product from sliderProducts array
        this.sliderProducts?.pop();
        // Insert a new product at the beginning of the array
        this.sliderProducts?.unshift(
          this.relatedProducts[this.index - this.screenBreakpoint]
        );
        this.index--;
      }
    }
  }

  /**
   * Method to emit a clicked event when a product in the slider is clicked,
   * and navigate to the said product details
   * @param {string} id Product id
   */
  onProductClicked(id: string) {
    this._router
      .navigate([this.helpers.routing.detailsRouteAbsolute + '/' + id])
      .then();
    this.clicked.emit();
  }
}
