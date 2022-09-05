import { Component, OnInit } from '@angular/core';
import { HELPERS } from '../../../shared/constants/helpers';
import { FirebaseAuthService } from '../../../shared/services/firebase/auth.firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  helpers = HELPERS;

  constructor(private _auth: FirebaseAuthService) {}

  ngOnInit(): void {}

  onSignOut() {
    this._auth.logout();
  }
}
