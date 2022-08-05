import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.css']
})
export class ObservablesComponent implements OnInit, OnDestroy {
  // Property to store the counter value.
  count = 0;

  stop = false;
  throwError = false;
  // Properties to store the observable and subscription.
  private subscription?: Subscription;
  private counter?: Observable<number>;
  constructor() { }

  ngOnInit(): void {
    // Creating a custom Observable
    this.counter = new Observable((observer) => {
      let counter = 1;
      // Using setInterval to generate values.
      setInterval(() => {
        // If throw error button was clicked, throw an error
        if (this.throwError) {
          observer.error(new Error('An error occurred'));
        }
        // If stop button was clicked, complete the observable
        if (this.stop) {
          observer.complete();
        }
        // Pass on the value to the subscriber using next() method.
        observer.next(counter)
        counter++;
      }, 1000)
    })
  }

  // Method to start the counter
  onStartCounter() {
    // Create a subscription on the counter observable.
    this.subscription = this.counter?.subscribe({
      next: (count) => {
        this.count = count;
      },
      error: (e) => {
        alert(e);
        this.throwError = !this.throwError;
      },
      complete: () => {
        alert('Stopped')
        this.stop = !this.stop
      }
    })
  }
  onStopCounter() {
    this.stop = !this.stop
  }
  onThrowError() {
    this.throwError = !this.throwError;
  }

  ngOnDestroy(): void {
    // Unsubscribe when the component is destroyed.
    this.subscription?.unsubscribe();
  }
}
