import { Component, OnInit } from '@angular/core';
import { HELPERS } from '../../../../shared/constants/helpers';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  helpers = HELPERS;

  constructor() {}

  ngOnInit(): void {}
}
