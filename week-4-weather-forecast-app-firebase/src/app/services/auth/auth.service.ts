import {Injectable} from '@angular/core';
import {
  environment
} from "../../../environments/environment";
import {
  DataTransformationService
} from "../data-transformation.service";
import {
  HttpClient,
  HttpErrorResponse
} from "@angular/common/http";
import {BehaviorSubject, catchError, tap} from "rxjs";
import {UserResponse} from "../../shared/user-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * Firebase API key
   */
  readonly API_KEY = environment.FIREBASE_API_KEY;

  /**
   * Firebase REST API endpoint for login using email and password
   */
  private LOGIN_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`;

  /**
   * Firebase REST API endpoint for sing-up using email and password
   */
  private SIGNUP_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`

  /**
   * A behavior subject is used to emit the authentication state
   * , i.e, the latest user state emitted to subscribers, it can
   * be null or of type User.
   */
  USER_SUBJECT = new BehaviorSubject<UserResponse | null>(null);

  constructor(
    private _transformationService: DataTransformationService,
    private _http: HttpClient
  ) {
  }

  /**
   * Method to log in a user using email and password.
   * @param email
   * @param password
   */
  loginWithEmailAndPassword(email: string, password: string) {
    console.log('Login with email and Password: ');
    console.table({email, password});
    this._http.post<UserResponse>(this.LOGIN_ENDPOINT, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleErrors),
      tap(response => {
        //  TODO: Create login Side Effects.
      })
    )
  }

  /**
   * Method to create a new user with Email and Password --> Signup a new user.
   * @param email
   * @param password
   */
  createUserWithEmailAndPassword(email: string, password: string) {
    //  Create a POST request to create a new user --> Sign Up a new User.
    this._http.post<UserResponse>(this.SIGNUP_ENDPOINT, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleErrors),
      tap(response => {
        //  TODO: Create sing-up Side Effects.
      })
    )
  }

  /**
   * Method to auto login a user if the authentication is not expired
   */
  autoLogin() {
    //  TODO: AutoLogin Logic
    console.log('Auto login');
  }

  /**
   * Method to logout
   */
  logout() {
    //  TODO: Logout logic
  }

  /**
   * Method to clear the user auth data stored in browser localStorage
   * and navigate to the login component.
   * @private
   */
  private logoutSideEffects() {
    //  TODO: Add Logout side-effects
  }

  /**
   * Method to store the user auth data in browser localStorage
   * and navigate to the weather component.
   * @private
   */
  private loginSideEffects() {
    //  TODO: Add Login side-effects
  }

  /**
   * Method to handle the http errors encountered during the login and signup
   * @param errorResponse
   * @private
   * @returns An appropriate string representing the error.
   */
  private handleErrors(errorResponse: HttpErrorResponse) {
    return ''
  }

}
