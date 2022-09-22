import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../../shared/constants/models/product.model';

@Component({
  selector: 'app-orders-modal',
  templateUrl: './orders-modal.component.html',
  styleUrls: ['./orders-modal.component.css'],
})
export class OrdersModalComponent implements OnInit {
  @Input('orders') orders!: Order[];

  constructor() {}

  ngOnInit(): void {}
}
