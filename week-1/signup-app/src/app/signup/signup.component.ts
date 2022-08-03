import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { USER } from '../user.model';
import { HELPERS } from '../helper.constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // Create and initialize a user object.
  newUser: USER | undefined;
  // FormGroup object
  userFormGroup!: FormGroup;
  helper = HELPERS;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.newUser = {
      username: '',
      password: '',
      email: '',
    };

    /**
     * There are two ways to create form groups:
     * The one commented below: Using FormGroup constructor, and the other by using FormBuilder
     *
                this.userFormGroup = new FormGroup({
                username: new FormControl(this.newUser.username, [
                  Validators.required,
                  Validators.minLength(4)
                ]),
                email: new FormControl(this.newUser.email, [
                  Validators.required,
                  Validators.email
                ]),
                password: new FormControl(this.newUser.password, [
                  Validators.required,
                  Validators.pattern(HELPERS.PASSWORD_VALIDATOR),
                ]),
              });
     */
    // Using FormBuilder to create form group
    this.userFormGroup = this.fb.group({
      username: [this.newUser.username, [
        Validators.required,
        Validators.minLength(4)
      ]],
      email: [this.newUser.email, [
        Validators.required,
        // Validators.email => This works but recognizes 'rohit@an' as a valid email address
        Validators.pattern(this.helper.EMAIL_VALIDATOR)
      ]],
      password: [this.newUser.password, [
        Validators.required,
        Validators.pattern(this.helper.PASSWORD_VALIDATOR),
      ]],
    })
  }

  // Getter methods to get the form inputs.
  get username() {
    return this.userFormGroup.get('username');
  }
  get email() {
    return this.userFormGroup.get('email');
  }
  get password() {
    return this.userFormGroup.get('password');
  }
  // Method to handle submit event.
  onSubmit() {
    // Create an alert
    const user = {
      username: this.username!.value,
      email: this.email!.value,
      password: this.password!.value
    }
    alert(`Hello ${user.username} !. You account has been created and a verification mail has been to ${user.email}`)
  }
}
