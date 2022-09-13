import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HELPERS } from '../../../../shared/constants/helpers';
import { FirebaseAuthService } from '../../../../shared/services/firebase/auth.firebase.service';
import { ToastService } from '../../../../shared/services/toast.service';

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
  };

  constructor(
    private _auth: FirebaseAuthService,
    private _toast: ToastService
  ) {
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
        this._toast.showSuccessToast(this.helpers.toast.message.WELCOME_BACK);
      },
      error: (err) => {
        this.pageUtils.loading = false;
        this._toast.showErrorToast(err.message);
        this.loginForm.reset();
      },
    });
  }
}
