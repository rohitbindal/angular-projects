import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {
  catchError,
  defer,
  from,
  map,
  Observable,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { APP_ROUTES } from '../../constants/app-routes';
import { HELPERS } from '../../constants/helpers';
import { User } from '../../constants/models/authorization.model';
import { FirebaseDataService } from './data.firebase.service';

@Injectable({ providedIn: 'root' })
export class FirebaseAuthService {
  user: Observable<User | null | undefined>;

  constructor(
    private _afAuth: AngularFireAuth,
    private _location: Location,
    private _data: FirebaseDataService,
    private _router: Router,
    private _afs: AngularFirestore
  ) {
    this.user = this._afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this._afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else return of(null);
      })
    );
  }

  signUp(email: string, password: string, username: string) {
    return defer(() =>
      from(this._afAuth.createUserWithEmailAndPassword(email, password))
    ).pipe(
      catchError(this.handleError),
      map((response) => {
        if (response.user) {
          const newUser: User = {
            uid: response.user.uid,
            email: email,
            roles: {
              subscriber: true,
            },
            username: username,
            disabled: false,
            cart: 0,
          };
          this._data.updateUser(newUser);
          this._router.navigate([APP_ROUTES.absolute.main.home]).then();
        }
      })
    );
  }

  login(email: string, password: string) {
    return defer(() =>
      from(this._afAuth.signInWithEmailAndPassword(email, password))
    ).pipe(
      catchError(this.handleError),
      map(() => {
        this._location.back();
      })
    );
  }

  logout() {
    this._afAuth.signOut().then();
    this._router.navigate([APP_ROUTES.absolute.main.login]).then();
  }

  private handleError(error: any) {
    let errorMessage = HELPERS.errors.default;

    const authErrors = HELPERS.errors.auth;

    switch (error.code) {
      case authErrors.TOO_MANY_REQUESTS.code:
        errorMessage = authErrors.TOO_MANY_REQUESTS.text;
        break;
      case authErrors.NOT_FOUND.code:
        errorMessage = authErrors.NOT_FOUND.text;
        break;
      case authErrors.USER_EXISTS.code:
        errorMessage = authErrors.USER_EXISTS.text;
        break;
      case authErrors.WRONG_PASSWORD.code:
        errorMessage = authErrors.WRONG_PASSWORD.text;
        break;
      default:
        errorMessage = HELPERS.errors.default;
    }

    return throwError(() => new Error(errorMessage));
  }
}
