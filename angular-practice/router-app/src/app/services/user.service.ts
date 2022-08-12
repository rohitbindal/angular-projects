import { Injectable } from "@angular/core";
import { USER_DATA } from "../data/user.data";
import { User } from "../data/user.model";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = USER_DATA;

  /**
   * @returns An array of all the users.
   */
  getUsers() {
    return this.users;
  }
  /**
   * @param index index of the user object in User array.
   * @returns user object
   */
  getUserByIndex(index: number) {
    return this.users[index];
  }
  /**
   * @param id User id
   * @returns user object
   */
  getUserById(id: number) {
    return this.users.find(user => user.id === id);
  }
}
