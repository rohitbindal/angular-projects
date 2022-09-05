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
  pageUtils = {
    loading: false,
    error: '',
  };

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
    if (this.loginForm.invalid) return;

    this.pageUtils.loading = true;

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this._auth.login(email, password).subscribe({
      next: (response) => {
        this.pageUtils.loading = false;
      },
      error: (err) => {
        // TODO: Show error tooltip
        this.pageUtils.loading = false;
        console.log(err.message);
        this.pageUtils.error = err.message;
        this.loginForm.reset();
      },
    });
  }
}
