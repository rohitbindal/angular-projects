import { Injectable } from "@angular/core";
import { LoggerService } from "./logger.service";
import { User } from "./user.model";

@Injectable()
export class UserService {
  user: User = {
    name: 'Anonymous',
    nameHistory: [],
  }
  // Injecting a LoggerService inside the UserService.
  constructor(private logger: LoggerService) { }

  getUser() {
    return this.user;
  }

  // Update the name and user LoggerService to set and get logs.
  updateUser(newName: string, oldName: string) {
    this.user.name = newName;
    // Set log using logger service.
    const log = this.logger.nameChanged(newName, oldName);
    // Add log to the user object
    this.user.nameHistory.unshift(log);
  }
}
