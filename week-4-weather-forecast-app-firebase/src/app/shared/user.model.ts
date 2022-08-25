/**
 * User Model for the signed-in user.
 */

export class User {
  constructor(
    public email: string,
    public uid: string,
    private token: string,
    private tokenExpirationDate: Date,
  ) {
  }

  /*Getter to return the authentication token*/
  get getToken() {
    // If the token is expired or does not exist.
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate)
      return null;
    return this.token
  }
/*Getter to return the token expiration date*/
  get getTokenExpirationDate() {
    return this.tokenExpirationDate;
  }
}
