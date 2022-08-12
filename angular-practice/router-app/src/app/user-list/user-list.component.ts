import { Component, OnInit } from '@angular/core';
import { User } from '../data/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.users = this._userService.getUsers();
  }

  // onUserClicked(index: number) {
  //   console.log(this.users[index]);
  // }

}
