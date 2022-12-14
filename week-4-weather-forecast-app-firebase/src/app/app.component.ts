import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _authService: AuthService) {
  }

  ngOnInit(): void {
    // Try to autologin when the application loads.
    this._authService.autoLogin();
  }
}
