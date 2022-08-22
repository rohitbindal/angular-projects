import {Component, OnInit} from '@angular/core';
import {
  AuthService
} from "../../../services/auth/auth.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {APP_ROUTES} from "../../../shared/constants/Routes";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  constructor(private _authService: AuthService, private _router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
  }

  /**
   * Navigate to the SignUp component
   */
  onSignupClicked() {
    this._router.navigate([APP_ROUTES.absolute.SIGN_UP]).then();
  }

}
