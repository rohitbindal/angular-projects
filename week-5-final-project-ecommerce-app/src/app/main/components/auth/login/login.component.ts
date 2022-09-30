import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HELPERS } from '../../../../shared/constants/helpers';
import { FirebaseAuthService } from '../../../../shared/services/firebase/auth.firebase.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  login$: Subscription | null;

  /* Object to hold the loading states and helpers object */
  pageUtils = {
    loading: false,
    helpers: HELPERS,
  };

  constructor(
    private _auth: FirebaseAuthService,
    private _toast: ToastService
  ) {
    this.login$ = null;
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.pageUtils.helpers.validators.EMAIL_VALIDATOR),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          this.pageUtils.helpers.validators.PASSWORD_VALIDATOR
        ),
      ]),
    });
  }

  /* Getter to return email element */
  get email() {
    return this.loginForm.get('email');
  }

  /* Getter to return password element */
  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {}

  onSubmit() {
    // If the form is invalid, return
    if (this.loginForm.invalid) return;

    // Start loading
    this.pageUtils.loading = true;

    // Get email and password from loginForm
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    // Start login
    this.login$ = this._auth.login(email, password).subscribe({
      next: (response) => {
        // Stop loading
        this.pageUtils.loading = false;
        // Show success toast
        this._toast.showSuccessToast(
          this.pageUtils.helpers.toast.message.WELCOME_BACK
        );
      },
      error: (err) => {
        // Stop loading
        this.pageUtils.loading = false;
        // Show error toast
        this._toast.showErrorToast(err.message);
        // Reset form
        this.loginForm.reset();
      },
    });
  }

  ngOnDestroy() {
    this.login$?.unsubscribe();
  }
}
