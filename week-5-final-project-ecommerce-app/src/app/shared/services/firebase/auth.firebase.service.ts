import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FirebaseAuthService {
  constructor(private _afAuth: AngularFireAuth, private _location: Location) {}

  signUp(email: string, password: string, username: string) {
    of(this._afAuth.createUserWithEmailAndPassword(email, password)).subscribe(
      (res) => {
        // TODO: Add username to user profile.
        console.log(res);
      },
      (err) => console.log(err)
    );
  }

  login(email: string, password: string) {
    of(this._afAuth.signInWithEmailAndPassword(email, password)).subscribe(() =>
      this._location.back()
    );
  }
}
