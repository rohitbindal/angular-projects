import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Private properties to store the URLs and API_KEY
  private API_KEY = environment.FIREBASE_API_KEY;
  private SIGN_UP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;
  private SIGN_IN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`;

  private tokenExpirationTimer: any;
  /**
   * A BehaviorSubject that provides an initial value of null
   * for the user state of the application. Also used to emit the new user
   * state any time the state changes.
   */
  userSubject = new BehaviorSubject<User>(null);

  constructor(private _http: HttpClient, private _router: Router) {}

  /**
   * @param email
   * @param password
   * @returns An Observable of type AuthResponseData
   * @description Method to signup a new user using the FirebaseAuth REST API
   */
  signup(email: string, password: string) {
    return this._http
      .post<AuthResponseData>(this.SIGN_UP_URL, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        // Handle the authentication of the application without affecting the response using tap() operator.
        tap((response) =>
          this.handleAuthentication(
            response.email,
            response.idToken,
            +response.expiresIn,
            response.localId
          )
        )
      );
  }

  /**
   * @param email
   * @param password
   * @returns An Observable of type AuthResponseData
   * @description Method to login using the FirebaseAuth REST API
   */
  login(email: string, password: string) {
    return this._http
      .post<AuthResponseData>(this.SIGN_IN_URL, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        // Handle the authentication of the application without affecting the response using tap() operator.
        tap((response) =>
          this.handleAuthentication(
            response.email,
            response.idToken,
            +response.expiresIn,
            response.localId
          )
        )
      );
  }

  /**
   * Method to login the user automatically via the stored userData object in browser
   * localStorage only if the Authentication token is valid.
   */
  autoLogin() {
    // Retrieving the userData object from localStorage
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    // If userData is undefined, return
    if (!userData) {
      return;
    }

    // Create a new User object using userData
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    // If the token exists
    if (loadedUser.token) {
      // Pass the user to the subject
      this.userSubject.next(loadedUser);
      // Get the time remaining for the token to expire
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      // Auto Logout once the token expires
      this.autoLogout(expirationDuration);
    }
  }

  /**
   * @param expirationDuration Expiration time in milliseconds.
   * @description Calls the logout() method once the timer expires.
   */
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  /**
   * Logs the user out, redirects the user to the Authentication Component,
   * Removes the userData Object from localStorage and clears the timeout,
   * incase user clicks logout instead of logging out automatically after the token expires
   */
  logout() {
    // Using the user subject to tell any active subscription that the user is null
    this.userSubject.next(null);
    // Navigate to the authentication page once the user logs out.
    this._router.navigate(['/auth']);
    // Clear the data when the user logs out.
    localStorage.removeItem('userData');
    // Clear the tokenExpirationTimer in case the user logs out manually instead after the token expires
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  /**
   *
   * @param email Email address as a string
   * @param token Authentication Token as a string
   * @param expiresIn Token expiration duration in Seconds
   * @param userId User id generated by firebase
   * @description Handles the authentication state during signup and login.
   * Passes the user object to active subscriptions using the user subject.
   * Creates and stores a userData object in then browser localStorage, calls the autoLogout() method
   * with expiresIn * 1000 to start the timer.
   */
  private handleAuthentication(
    email: string,
    token: string,
    expiresIn: number,
    userId: string
  ) {
    // Get the Expiration Date of the Auth Token
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    // Create a new User Object when authenticated.
    const user = new User(email, userId, token, expirationDate);
    // Using the user subject to emit the new user to any active subscription looking for it.
    this.userSubject.next(user);
    // Logout automatically when the token expires
    this.autoLogout(expiresIn * 1000);
    // Store the user object in browser local storage.
    localStorage.setItem('userData', JSON.stringify(user));
  }

  /**
   * @param errorResponse HttpErrorResponse object received as a response from the auth call
   * @returns An error object with the suitable message.
   * @description A private method to handle Http Errors based on response from the API
   */
  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    // If the error property does not exists, return the default error message
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    // Throw a new error based on the Error type.
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'An account with this email already exists!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Email or Password is incorrect.';
        break;
      case 'USER_DISABLED':
        errorMessage =
          'User account is disabled, please contact your administrator.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email does not exists';
        break;
      default:
        errorMessage = 'An unknown error occurred!';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }
}
