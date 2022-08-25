import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder-directive/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  isLoginMode: boolean = true;
  isLoading = false;
  error: string = null;

  // Creating a ViewChild property to access the element holding the PlaceholderDirective
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private componentSubscription: Subscription;

  constructor(private _authService: AuthService, private _router: Router) {}
  /**
   * Method to switch between login and signup mode.
   */
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  /**
   * @param form An object of type NgForm received from the template
   * @description Method to submit the form and authenticate the user.
   */
  onSubmit(form: NgForm) {
    if (!form.valid) return;

    // Get the value of email and password from the form
    const email = form.value['email'];
    const password = form.value['password'];
    // Start the loader
    this.isLoading = true;
    // Handle Authentication
    this.handleAuthentication(email, password);
    // Reset the form regardless of the response.
    form.reset();
  }

  /**
   * @param email
   * @param password
   * @description A private method to handle Authentication on signup or login
   */
  private handleAuthentication(email: string, password: string) {
    // An observable to handle authentication
    let authObservable: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObservable = this._authService.login(email, password);
    } else {
      authObservable = this._authService.signup(email, password);
    }

    authObservable.subscribe({
      // If the authentication is successful, remove the loader and navigate to recipes component
      next: (response) => {
        // Remove the loader
        this.isLoading = false;
        // Navigate to the recipes component
        this._router.navigate(['/recipes']);
      },
      // If there is an error, remove the loader and show the AlertComponent with error message.
      error: (errorResponse) => {
        this.error = errorResponse.message;
        // Create the AlertComponent
        this.showErrorAlert(errorResponse.message);
        // Stop the loader
        this.isLoading = false;
      },
    });
  }

  // Set the error to null to remove the AlertComponent
  handleOnModalClose() {
    this.error = null;
  }

  // Method to Create a Dynamic AlertComponent using ViewContainer
  private showErrorAlert(error: string) {
    // Using the ViewChild ref to get access to the ViewContainerRef from  PlaceholderDirective
    const hostViewContainerRef = this.alertHost._viewContainerRef;
    // Clear any children of the ViewContainer
    hostViewContainerRef.clear();
    // Create the component
    const componentRef = hostViewContainerRef.createComponent(AlertComponent);
    // Set the error message
    componentRef.instance.message = error;
    // Subscribe to the modalClose event
    this.componentSubscription = componentRef.instance.close.subscribe(() => {
      // Remove the AlertComponent from the ViewContainer
      hostViewContainerRef.clear();
      // Remove the subscription
      this.componentSubscription.unsubscribe();
    });
  }

  ngOnDestroy(): void {
    if (this.componentSubscription) {
      this.componentSubscription.unsubscribe();
    }
  }
}
