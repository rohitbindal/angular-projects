import { Component, OnInit } from '@angular/core';
import { HELPERS } from '../../../shared/constants/helpers';
import { FirebaseAuthService } from '../../../shared/services/firebase/auth.firebase.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
})
export class AdminHeaderComponent implements OnInit {
  helper = HELPERS;

  constructor(private _auth: FirebaseAuthService) {}

  ngOnInit(): void {}

  onLogout() {
    this._auth.logout();
  }
}
