import { Component, OnInit } from '@angular/core';
import { HELPERS } from '../../../shared/constants/helpers';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
})
export class AdminHeaderComponent implements OnInit {
  helper = HELPERS.routing.admin;

  constructor() {}

  ngOnInit(): void {}

  onSignOut() {
    //  TODO: Sign Out and navigate to login
  }
}
