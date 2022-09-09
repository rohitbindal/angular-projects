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
import { Product } from '../../../../../shared/constants/product.model';
import { FirebaseDataService } from '../../../../../shared/services/firebase/data.firebase.service';

@Component({
  selector: 'app-checkout-item',
  templateUrl: './checkout-item.component.html',
  styleUrls: ['./checkout-item.component.css'],
})
export class CheckoutItemComponent implements OnInit, OnDestroy {
  @Input() product: Product | null;
  @Input() index!: number;
  @Output('delete') deleteClicked = new EventEmitter();
  @Output('updated') qtyUpdate = new EventEmitter();
  helpers = HELPERS;

  constructor(private _data: FirebaseDataService) {
    this.product = null;
  }

  onDelete() {
    this.deleteClicked.emit();
  }

  ngOnInit(): void {}

  onDecrement() {
    this._data.updateQuantity(this.product!.id, -1);
    this.qtyUpdate.emit();
  }

  onIncrement() {
    this._data.updateQuantity(this.product!.id, 1);
    this.qtyUpdate.emit();
  }

  @HostListener('unload')
  ngOnDestroy() {
    this.product = null;
  }
}
