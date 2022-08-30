import { Component, OnInit } from '@angular/core';
import { HELPERS } from '../../../shared/constants/helpers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  helpers = HELPERS;

  constructor() {}

  ngOnInit(): void {}
}
