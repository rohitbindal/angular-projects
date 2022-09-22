import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Toast } from 'bootstrap';
import { EventTypes } from '../../../constants/models/toasts.model';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit {
  @Output() disposeEvent = new EventEmitter();

  @ViewChild('toastElement', { static: true })
  toastEl!: ElementRef;

  /* Type of toast -> Success, Error, Info */
  @Input()
  type!: EventTypes;

  /* Toast Message */
  @Input()
  message!: string;

  /* Bootstrap Toast object to hold the toast */
  toast!: Toast;

  ngOnInit() {
    this.show();
  }

  /* Method to show toast */
  show() {
    // Create a new toast with the given type and message
    this.toast = new Toast(
      this.toastEl.nativeElement,
      // If type == error, don't hide, else hide after 5000ms
      this.type === EventTypes.ERROR
        ? {
            autohide: false,
          }
        : {
            delay: 5000,
          }
    );

    // Show toast
    this.toast.show();
  }

  /* Method to hide toast */
  hide() {
    this.toast.dispose();
    this.disposeEvent.emit();
  }
}
