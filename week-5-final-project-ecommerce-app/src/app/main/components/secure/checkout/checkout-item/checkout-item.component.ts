import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HELPERS } from '../../../../../shared/constants/helpers';
import { Product } from '../../../../../shared/constants/product.model';

@Component({
  selector: 'app-checkout-item',
  templateUrl: './checkout-item.component.html',
  styleUrls: ['./checkout-item.component.css'],
})
export class CheckoutItemComponent implements OnInit {
  @Input() product!: Product;
  @Input() index!: number;
  @Output('delete') deleteClicked = new EventEmitter();
  helpers = HELPERS;

  constructor() {}

  onDelete() {
    this.deleteClicked.emit();
  }

  ngOnInit(): void {}
}
