import { Component, OnInit } from '@angular/core';
import { Log } from './log.model';
import { LoggerService } from './logger.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  providers: [UserService, LoggerService]
})
export class ServicesComponent implements OnInit {
  logs: Log[] = [];
  _name = '';
  constructor(private userService: UserService, private logger: LoggerService) { }

  ngOnInit(): void {
    this.logs = this.logger.getLogs();
    this._name = this.userService.getUser().name;
  }

  // Method to use the userService to update and log the values.
  changeName(nameInput: string) {
    this.userService.updateUser(nameInput, this._name);
    this._name = nameInput;
  }

}
