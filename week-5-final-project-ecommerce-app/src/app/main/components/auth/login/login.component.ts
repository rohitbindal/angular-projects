import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HELPERS } from '../../../../shared/constants/helpers';
import { FirebaseAuthService } from '../../../../shared/services/firebase/auth.firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  helpers = HELPERS;
  loginForm: FormGroup;

  constructor(private _auth: FirebaseAuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.helpers.validators.EMAIL_VALIDATOR),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.helpers.validators.PASSWORD_VALIDATOR),
      ]),
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.loginForm.value);
  }
}
