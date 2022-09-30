import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APP_ROUTES } from '../../../shared/constants/app-routes';
import { HELPERS } from '../../../shared/constants/helpers';
import { FirebaseAuthService } from '../../../shared/services/firebase/auth.firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  helpers = HELPERS;
  /* Property to store the authentication status */
  authenticated = false;
  /* Property to store the cart item counter */
  cart = 0;
  private userSub$: Subscription;

  constructor(private _auth: FirebaseAuthService, private _router: Router) {
    this.userSub$ = this._auth.user.subscribe((user) => {
      // If the user exists, change authentication status, update cart counter
      if (user) {
        this.authenticated = true;
        if (user.cart != null) this.cart = user.cart;
      } else {
        this.cart = 0;
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.userSub$.unsubscribe();
  }

  /* Method to logout user, Navigate to login after logout */
  onLogOut() {
    this._auth.logout();
    setTimeout(() => this.onLogIn(), 600);
  }

  /* Method to take user to login page */
  onLogIn() {
    this._router.navigate([APP_ROUTES.absolute.main.login]).then();
  }
}
