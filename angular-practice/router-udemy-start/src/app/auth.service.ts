export class AuthService {
  loggedIn = false;

  // Return the authentication status with a delay of 800ms.
  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800);
    });
  }

  // Change the login state to true
  logIn() {
    this.loggedIn = true;
  }

  // Change the login state to false.
  logOut() {
    this.loggedIn = false;
  }
}
