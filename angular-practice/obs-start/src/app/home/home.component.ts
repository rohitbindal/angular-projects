import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, map, Observable, Subscription } from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;
  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // })
    const customIntervalObservable = new Observable(observer => {
      let count = 0
      setInterval(() => {
        // Next is used to emit the next value
        observer.next(count);
        // Complete the observable
        if (count === 2) {
          observer.complete();
        }
        // Throw an error
        if (count > 3) {
          observer.error(new Error('Count is greater than 3!'))
        }
        count++
      }, 1000)
    })

    // Transforming the data before subscribing using operators
    this.firstObsSubscription = customIntervalObservable.pipe(map((data: number) => {
      return 'Round: ' + data + 1;
    })).subscribe(data => {
      console.log(data);
    }, error => {
      // Error handling
      console.log(error);
      alert(error.message)
    }, () => {
      // Complete Handler
      console.log('Completed !')
    })
  }
  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }

}
