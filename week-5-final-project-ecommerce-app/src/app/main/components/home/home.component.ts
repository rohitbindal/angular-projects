import { Component, OnInit } from '@angular/core';
import { HELPERS } from '../../../shared/constants/helpers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  helpers = HELPERS;

  constructor() {}

  ngOnInit(): void {}
}
