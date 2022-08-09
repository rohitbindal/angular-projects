import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Accessing the signup form reference created in the HTML template
  @ViewChild('f') signupForm: NgForm;

  defaultQuestion = 'pet'
  answer = '';
  genders = ['male', 'female'];
  // Create a user object to store the input values
  user = {
    userName: '',
    email: '',
    secQues: '',
    answer: '',
    gender: '',
  }
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    /**
     * The method below overwrites all the existing values in the form.
          this.signupForm.setValue({
          userData: {
            username: suggestedName,
            email: '',
          },
          secret: 'pet',
          questionAnswer: '',
          gender: 'male'
        })
     */
    // patchValue() method can be used to overwrite a specific value.
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    })
  }
  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }
  onSubmit() {
    this.submitted = true;
    // Accessing and assigning the form input values.
    this.user.userName = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secQues = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    // Reset the form when submitted.
    this.signupForm.reset();
  }
}
