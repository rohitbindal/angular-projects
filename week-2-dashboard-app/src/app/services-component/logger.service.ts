import { Injectable } from "@angular/core";
import { Log } from "./log.model";

// Not providing the service in root since we only need it in Service Component.
@Injectable()
export class LoggerService {
  nameChangeLogs: Log[] = [];

  getLogs() {
    return this.nameChangeLogs;
    // return this.nameChangeLogs.slice();
  }
  nameChanged(newName: string, oldName: string): Log {
    const currentTime = new Date().toString();
    // Creating a new Log object
    const log: Log = {
      newName,
      oldName,
      changeTime: currentTime
    }
    // Add a log to the start of the array
    this.nameChangeLogs.unshift(log);
    // Return the created log
    return log;
  }
}
