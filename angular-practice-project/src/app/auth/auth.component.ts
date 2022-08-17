import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading = false;
  error: string = null;

  constructor(private _authService: AuthService, private _router: Router) {}
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) return;

    const email = form.value['email'];
    const password = form.value['password'];
    this.isLoading = true;

    let authObservable: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObservable = this._authService.login(email, password);
    } else {
      authObservable = this._authService.signup(email, password);
    }

    authObservable.subscribe({
      next: (response) => {
        this.isLoading = false;
        // Navigate to the recipes component
        this._router.navigate(['/recipes']);
      },
      error: (errorResponse) => {
        this.error = errorResponse.message;
        this.isLoading = false;
      },
    });
    form.reset();
  }
}
