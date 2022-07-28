import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() featureSelector = new EventEmitter<string>();
  onSelect(feature: string) {
    this.featureSelector.emit(feature);
  }
}
