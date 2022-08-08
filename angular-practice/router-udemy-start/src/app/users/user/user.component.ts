import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

type User = { id: number, name: string }
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: User = {
    id: 0,
    name: ''
  };
  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    // Using Snapshot
    // this.user.id = this._route.snapshot.params.id
    // this.user.name = this._route.snapshot.params.name

    // Using a subscription in case there is a change in the route parameters
    this._route.paramMap.subscribe(params => {
      this.user.id = params['params']['id']
      this.user.name = params['params']['name']
    })
  }

  ngOnDestroy(): void {
    // this.routeSubscription.unsubscribe()
  }
}
