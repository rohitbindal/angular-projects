import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { APP_ROUTES } from '../../shared/constants/Routes';
import { UserResponse } from '../../shared/user-response';
import { User } from '../../shared/user.model';
import { DataTransformationService } from '../data-transformation.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /* Firebase API key */
  readonly API_KEY = environment.FIREBASE_API_KEY;
  /**
   * A behavior subject is used to emit the authentication state
   * , i.e, the latest user state emitted to subscribers, it can
   * be null or of type User.
   */
  USER_SUBJECT = new BehaviorSubject<User | null>(null);
  /* Firebase REST API endpoint for login using email and password */
  private LOGIN_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`;
  /* Firebase REST API endpoint for sing-up using email and password */
  private SIGNUP_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;
  /*Local timer used to create a timeout for the given duration*/
  private tokenExpirationTimer: number | null = null;

  constructor(
    private _transformationService: DataTransformationService,
    private _http: HttpClient,
    private _router: Router
  ) {}

  /**
   * Method to log in a user using email and password.
   * @param email
   * @param password
   */
  loginWithEmailAndPassword(email: string, password: string) {
    return this._http
      .post<UserResponse>(this.LOGIN_ENDPOINT, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleErrors), tap(this.handleAuthentication));
  }

  /**
   * Method to create a new user with Email and Password --> Signup a new user.
   * @param email
   * @param password
   */
  createUserWithEmailAndPassword(email: string, password: string) {
    //  Create a POST request to create a new user --> Sign Up a new User.
    return this._http
      .post<UserResponse>(this.SIGNUP_ENDPOINT, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleErrors), tap(this.handleAuthentication));
  }

  /**
   * Method to auto login a user if the authentication token is not expired.
   */
  autoLogin() {
    // Get the user from localStorage
    const loadedUser: {
      email: string;
      uid: string;
      token: string;
      expirationDate: string;
    } = JSON.parse(localStorage.getItem('user')!);
    // If the user does not exist, return
    if (!loadedUser) return;

    /* A new user object created using the loaded user.*/
    const user: User = new User(
      loadedUser.email,
      loadedUser.uid,
      loadedUser.token,
      new Date(loadedUser.expirationDate)
    );

    // If the user token exists
    if (user.getToken) {
      // Emit the user
      this.USER_SUBJECT.next(user);
      // Get the time remaining for the token to expire
      const expirationDuration =
        new Date(user.getTokenExpirationDate).getTime() - new Date().getTime();
      // Auto logout the user once the token expires
      this.autoLogout(expirationDuration);
    }
  }

  /**
   * Method to auto logout the user if the authentication token is expired
   */
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(
      () => this.logout(),
      expirationDuration
    );
  }

  /**
   * Logs the user out, redirects the user to the Login Component,
   * Removes the user Object from localStorage and clears the timeout
   * in case user clicks logout instead of logging out automatically after the
   * token expires.
   */
  logout() {
    // Emit that the User has been set to null
    this.USER_SUBJECT.next(null);
    // Remove the user from local storage.
    localStorage.removeItem('user');

    // If the timer has not been expired, clear the timer
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;

    // Navigate to the login page.
    this.navigateAfterAuth(APP_ROUTES.absolute.LOGIN);
  }

  /**
   * Method to store the user auth data in browser localStorage,
   * setup auto logout and navigate to the weather component.
   * @private
   * @param userResponse An object of response received from Firebase
   */
  private handleAuthentication(userResponse: UserResponse) {
    const expiresIn: number = +userResponse.expiresIn * 1000;
    const expirationDate = new Date(new Date().getTime() + expiresIn);

    /* A new user object */
    const user: User = new User(
      userResponse.email,
      userResponse.localId,
      userResponse.idToken,
      expirationDate
    );

    /*Using the USER_SUBJECT to emit the new user to any active*/
    this.USER_SUBJECT.next(user);

    /*Store the user data locally*/
    localStorage.setItem('user', JSON.stringify(user));

    /*Setup Auto Logout side effect*/
    this.autoLogout(expiresIn);
  }

  /**
   * Method to navigate to a certain route.
   * @param routeName Route name
   * @private
   */
  private navigateAfterAuth(routeName: string) {
    this._router.navigate([routeName]).then(null);
  }

  /**
   * Method to handle the http errors encountered during the login and signup
   * @param errorResponse HttpErrorResponse Object received from Firebase.
   * @private
   * @returns Throws a new error with an appropriate string representing the
   *   error
   */
  private handleErrors(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    // If the error property does not exist, return the default error message
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
