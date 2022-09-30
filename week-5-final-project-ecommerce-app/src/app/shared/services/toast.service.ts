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

  /**
   * Method to show a Success Toast
   * @param {string} message Toast message
   */
  showSuccessToast(message: string) {
    this.toastEvents.next({
      message,
      type: EventTypes.SUCCESS,
    });
  }

  /**
   * Method to show an Error Toast
   * @param {string} message Toast message
   */
  showErrorToast(message: string) {
    this.toastEvents.next({
      message,
      type: EventTypes.ERROR,
    });
  }

  /**
   * Method to show an Info Toast
   * @param {string} message Toast message
   */
  showInfoToast(message: string) {
    this.toastEvents.next({
      message,
      type: EventTypes.INFO,
    });
  }
}
