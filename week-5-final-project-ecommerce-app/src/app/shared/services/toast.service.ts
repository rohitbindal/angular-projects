import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EventTypes, ToastEvent } from '../constants/models/toasts.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toastEvents$: Observable<ToastEvent>;
  private toastEvents = new Subject<ToastEvent>();

  constructor() {
    this.toastEvents$ = this.toastEvents.asObservable();
  }

  showSuccessToast(message: string) {
    this.toastEvents.next({
      message,
      type: EventTypes.SUCCESS,
    });
  }

  showErrorToast(message: string) {
    this.toastEvents.next({
      message,
      type: EventTypes.ERROR,
    });
  }

  showInfoToast(message: string) {
    this.toastEvents.next({
      message,
      type: EventTypes.INFO,
    });
  }
}
