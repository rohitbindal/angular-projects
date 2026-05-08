import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HELPERS } from '../../../../shared/constants/helpers';
import { FirebaseAuthService } from '../../../../shared/services/firebase/auth.firebase.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;
  signUp$: Subscription | null;
  /* Object to hold the loading states and helpers object */
  pageUtils = {
    loading: false,
    helpers: HELPERS,
  };

  constructor(
    private _auth: FirebaseAuthService,
    private _toast: ToastService
  ) {
    this.signUp$ = null;
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
          Validators.pattern(this.pageUtils.helpers.validators.EMAIL_VALIDATOR),
        ]
      ),
      password: new FormControl(
        {
          value: null,
          disabled: this.pageUtils.loading,
        },
        [
          Validators.required,
          Validators.pattern(
            this.pageUtils.helpers.validators.PASSWORD_VALIDATOR
          ),
        ]
      ),
      confirmPassword: new FormControl(
        {
          value: null,
          disabled: this.pageUtils.loading,
        },
        [
          Validators.required,
          Validators.pattern(
            this.pageUtils.helpers.validators.PASSWORD_VALIDATOR
          ),
        ]
      ),
    });
  }

  /* Getter to return password element */
  get password() {
    return this.signUpForm.get('password');
  }

  /* Getter to return confirm password element */
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  /* Getter to return email element */
  get email() {
    return this.signUpForm.get('email');
  }

  /* Getter to return username element */
  get username() {
    return this.signUpForm.get('username');
  }

  /* Getter to return comparison of password and confirmPassword */
  get matchPassword() {
    return this.password?.value == this.confirmPassword?.value;
  }

  onSubmit() {
    // If the form is invalid, return
    if (!this.signUpForm.valid) return;

    // Start loading
    this.pageUtils.loading = true;

    // Get email, password and username from signupForm
    const email = this.email?.value;
    const password = this.password?.value;
    const username = this.username?.value;

    // Start signup
    this.signUp$ = this._auth.signUp(email, password, username).subscribe({
      next: (response) => {
        // Stop loading
        this.pageUtils.loading = false;
        // Show success toast
        this._toast.showSuccessToast(
          this.pageUtils.helpers.toast.message.NEW_USER
        );
      },
      error: (err) => {
        // Stop loading
        this.pageUtils.loading = false;
        // Show error toast
        this._toast.showErrorToast(err.message);
        // Reset form
        this.signUpForm.reset();
      },
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.signUp$?.unsubscribe();
  }
}
