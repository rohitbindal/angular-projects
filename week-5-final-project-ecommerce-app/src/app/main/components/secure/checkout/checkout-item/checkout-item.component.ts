import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { HELPERS } from '../../../../../shared/constants/helpers';
import { Product } from '../../../../../shared/constants/models/product.model';
import { FirebaseDataService } from '../../../../../shared/services/firebase/data.firebase.service';

@Component({
  selector: 'app-checkout-item',
  templateUrl: './checkout-item.component.html',
  styleUrls: ['./checkout-item.component.css'],
})
export class CheckoutItemComponent implements OnInit, OnDestroy {
  /* Property to hold the product received from parent */
  @Input() product: Product | null;
  /* Event emitter for delete clicked event */
  @Output('delete') deleteClicked = new EventEmitter();
  /* Event emitter for quantity update event */
  @Output('updated') qtyUpdate = new EventEmitter();

  helpers = HELPERS;

  constructor(private _data: FirebaseDataService) {
    this.product = null;
  }

  /* Method to emit a deleteClicked event */
  onDelete() {
    this.deleteClicked.emit();
  }

  ngOnInit(): void {}

  /* Method to decrement qty and emit a quantity update event */
  onDecrement() {
    this._data.updateQuantity(this.product!.id, -1);
    this.qtyUpdate.emit();
  }

  /* Method to increment and emit a quantity update event */
  onIncrement() {
    this._data.updateQuantity(this.product!.id, 1);
    this.qtyUpdate.emit();
  }

  @HostListener('unload')
  ngOnDestroy() {
    this.product = null;
  }
}
