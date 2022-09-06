import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HELPERS } from '../../../../shared/constants/helpers';
import { FirebaseAuthService } from '../../../../shared/services/firebase/auth.firebase.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  helpers = HELPERS;
  signUpForm: FormGroup;
  pageUtils = {
    loading: false,
    error: '',
  };

  constructor(
    private _auth: FirebaseAuthService,
    private _toast: ToastService
  ) {
    this.signUpForm = new FormGroup({
      username: new FormControl(
        {
          value: null,
          disabled: this.pageUtils.loading,
        },
        [Validators.required]
      ),
      email: new FormControl(
        {
          value: null,
          disabled: this.pageUtils.loading,
        },
        [
          Validators.required,
          Validators.pattern(this.helpers.validators.EMAIL_VALIDATOR),
        ]
      ),
      password: new FormControl(
        {
          value: null,
          disabled: this.pageUtils.loading,
        },
        [
          Validators.required,
          Validators.pattern(this.helpers.validators.PASSWORD_VALIDATOR),
        ]
      ),
      confirmPassword: new FormControl(
        {
          value: null,
          disabled: this.pageUtils.loading,
        },
        [
          Validators.required,
          Validators.pattern(this.helpers.validators.PASSWORD_VALIDATOR),
        ]
      ),
    });
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get username() {
    return this.signUpForm.get('username');
  }

  get matchPassword() {
    return this.password?.value == this.confirmPassword?.value;
  }

  onSubmit() {
    if (!this.signUpForm.valid) return;
    this.pageUtils.loading = true;
    const email = this.email?.value;
    const password = this.password?.value;
    const username = this.username?.value;

    this._auth.signUp(email, password, username).subscribe({
      next: (response) => {
        this.pageUtils.loading = false;
        this._toast.showSuccessToast(this.helpers.toast.message.NEW_USER);
      },
      error: (err) => {
        this.pageUtils.loading = false;
        this._toast.showErrorToast(err.message);
        this.signUpForm.reset();
      },
    });
  }

  ngOnInit(): void {}
}
