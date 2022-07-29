import { Component, OnInit } from '@angular/core';
import { USER } from '../user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // Create and initialize a user object.
  newUser: USER = {
    username: '',
    password: '',
    email: '',
    confirmPassword: '',
  };
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(event: SubmitEvent) {
    // Stop the page from reloading when submit is clicked.
    event.preventDefault()
    // Get the Form Element
    const formElement = <HTMLFormElement>event.target
    // Get the input elements.
    const userName = formElement['username'];
    // const email = formElement['email'];
    const password = formElement['password'];
    const confirmPassword = formElement['confirm-password']
    // If passwords do not match, show a label, else submit.
    if (password.value === confirmPassword.value) {
      alert(`User ${userName.value} created!`);
      formElement.submit();
    } else {
      confirmPassword.setCustomValidity('Passwords do not match');
    }
  }
}
