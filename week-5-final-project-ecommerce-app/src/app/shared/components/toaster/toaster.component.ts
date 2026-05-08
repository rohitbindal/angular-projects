import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastEvent } from '../../constants/models/toasts.model';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToasterComponent implements OnInit, OnDestroy {
  /* An array to store toasts */
  currentToasts: ToastEvent[] = [];
  private toasts$: Subscription | null;

  constructor(
    private _toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {
    this.toasts$ = null;
  }

  ngOnInit() {
    this.subscribeToToasts();
  }

  ngOnDestroy() {
    this.toasts$?.unsubscribe();
  }

  /* Method to store the generated toasts */
  subscribeToToasts() {
    this.toasts$ = this._toastService.toastEvents$.subscribe((toasts) => {
      const currentToast: ToastEvent = {
        type: toasts.type,
        message: toasts.message,
      };
      this.currentToasts.push(currentToast);
      this.cdr.detectChanges();
    });
  }

  /* Method to dispose toasts */
  dispose(index: number) {
    this.currentToasts.splice(index, 1);
    this.cdr.detectChanges();
  }
}
