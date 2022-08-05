import { Component, OnInit } from '@angular/core';
import { DUMMY, dummyData } from './data.model';

@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.css'],
})
export class PipesComponent implements OnInit {
  serverData: DUMMY[] = [];
  filteredStatus = '';
  constructor() { }

  ngOnInit(): void {
    this.serverData = dummyData
  }

}
