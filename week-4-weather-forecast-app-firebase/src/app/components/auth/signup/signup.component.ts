import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { APP_ROUTES } from '../../../shared/constants/Routes';
import { UserResponse } from '../../../shared/user-response';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  isLoading: boolean;
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
    this.updateLoaderState(true);
    // Get the email and password properties from login form
    const email = form.value['email'];
    const password = form.value['password'];

    // Handle Authentication
    this.handleAuthentication(email, password);
  }

  /**
   * Navigate to the Login component
   */
  onLoginClicked() {
    this._router.navigate([APP_ROUTES.absolute.LOGIN]).then();
  }

  /**
   * Method to create a new user and navigate to the weather component
   * @param {string} email
   * @param {string} password
   * @private
   */
  private handleAuthentication(email: string, password: string) {
    // An observer with the next and error callbacks
    const observer = {
      next: (response: UserResponse) => {
        // Navigate to the Weather Component
        this._router.navigate([APP_ROUTES.absolute.WEATHER]).then(null);
        this.updateLoaderState(false);
      },
      error: (error: Error) => {
        this.error = error.message;
        this.updateLoaderState(false);
      },
    };

    // Create a new user
    this.authenticationSubscription$ = this._authService
      .createUserWithEmailAndPassword(email, password)
      .subscribe(observer);
  }

  private updateLoaderState(state: boolean) {
    this.isLoading = state;
  }
}
