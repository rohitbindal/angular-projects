import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../data/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  user!: User;
  subscription: Subscription | undefined;
  constructor(private _activatedRoute: ActivatedRoute, private _userService: UserService, private _router: Router) { }

  ngOnInit(): void {
    this.subscription = this._activatedRoute.paramMap.subscribe(param => {
      const id = Number(param.get('id'));
      const fetchedUser = this._userService.getUserById(id);
      if (fetchedUser) {
        this.user = fetchedUser;
      }
      else {
        // TODO: Navigate to Page Not Found if the ID is invalid.
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
