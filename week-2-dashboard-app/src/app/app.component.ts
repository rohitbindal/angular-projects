import { Component } from '@angular/core';

// Defining a screen status type.
type ScreenStatus = {
  [id: string]: {
    status: boolean
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'week-2-dashboard-app';
  // Variable to store the current screen status.
  currentScreen: ScreenStatus;

  constructor() {
    // Initializing the current screen status
    this.currentScreen =
    {
      'binding': {
        status: true
      },
      'services': {
        status: false,
      },
      'observables': {
        status: false,
      },
      'errorHandling': {
        status: false,
      }
    }
  }

  // Change the boolean value denoting the screen status when the button is clicked.
  onStatusChange(id: string) {
    for (const prop in this.currentScreen) {
      // Activate/Deactivate the respective screen
      if (prop === id) {
        this.currentScreen[id].status = !this.currentScreen[id].status;
      }
      // Deactivate all the other screens.
      else {
        this.currentScreen[prop].status = false;
      }
    }
  }
}
