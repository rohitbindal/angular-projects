import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attribute-binding',
  templateUrl: './attribute-binding.component.html',
  styleUrls: ['./attribute-binding.component.css']
})
export class AttributeBindingComponent implements OnInit {
  colSpanned = false;
  constructor() {
  }

  ngOnInit(): void {
  }
  onColSpanChanged() {
    this.colSpanned = !this.colSpanned;
  }
}
