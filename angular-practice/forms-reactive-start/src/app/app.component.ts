import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUserNames = ['chris', 'bumstead'];

  ngOnInit() {
    // Initialize the signup form
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('male'),
      // Using FormArray to create an array of FormControls
      'hobbies': new FormArray([]),
    });

    // this.signupForm.valueChanges.subscribe(value => {
    //   console.log(value)
    // })
    this.signupForm.statusChanges.subscribe(status => console.log(status))
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  // Add a new hobby input to the existing hobby array
  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }
  // Get all the hobby form controls / inputs
  getHobbyControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }
  // Custom Validator for name
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    // if the username is invalid, return the custom error.
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true }
    }
    return null;
  }

  // Custom validator for email using promises
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      // Using setTimeout to produce a promise behavior
      setTimeout(() => {
        // resolve the custom error value if email is invalid.
        if (control.value === 'test@test.com') {
          resolve({ 'emailIsForbidden': true })
        } else {
          resolve(null)
        }
      }, 1500)
    })
    return promise;
  }
}
