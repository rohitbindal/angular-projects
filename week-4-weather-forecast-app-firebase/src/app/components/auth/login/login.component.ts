import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { APP_ROUTES } from '../../../shared/constants/Routes';
import { UserResponse } from '../../../shared/user-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  /* Loading State */
  isLoading: boolean;

  /*Error*/
  error: string;

  private authenticationSubscription$: Subscription | null;

  constructor(private _authService: AuthService, private _router: Router) {
    this.isLoading = false;
    this.error = '';
    this.authenticationSubscription$ = null;
  }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    // Start the loader
    this.updateLoader(true);
    // Get the email and password properties from login form
    const email = form.value['email'];
    const password = form.value['password'];

    // Login the user and navigate to the Weather Component
    this.handleAuthentication(email, password);
  }

  /**
   * Navigate to the SignUp component
   */
  onSignupClicked() {
    this._router.navigate([APP_ROUTES.absolute.SIGN_UP]).then();
  }

  ngOnDestroy() {
    this.authenticationSubscription$?.unsubscribe();
  }

  /**
   * Method to handle Authentication and navigate to the Weather Component
   * @param {string} email
   * @param {string} password
   * @private
   */
  private handleAuthentication(email: string, password: string) {
    // An observer with the next and error callbacks
    const observer = {
      next: (response: UserResponse) => {
        console.log(response);
        this.updateLoader(false);
        this._router.navigate([APP_ROUTES.absolute.WEATHER]).then(null);
      },
      error: (error: Error) => {
        this.error = error.message;
        this.updateLoader(false);
        console.log(error);
      },
    };

    // Login the user
    this.authenticationSubscription$ = this._authService
      .loginWithEmailAndPassword(email, password)
      .subscribe(observer);
  }

  private updateLoader(state: boolean) {
    this.isLoading = state;
  }
}
