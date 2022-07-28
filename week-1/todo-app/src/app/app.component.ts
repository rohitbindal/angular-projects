import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-app';
  // Flag to update the way todos are displayed ,i.e, using Services or just Data Binding
  useServices = false;
}
