import { Injectable } from "@angular/core";
import { Log } from "./log.model";

// Not providing the service in root since we only need it in Service Component.
@Injectable()
export class LoggerService {
  nameChangeLogs: Log[] = [
    {
      oldName: 'Rohit',
      newName: 'Bindal',
      changeTime: '22 Aug 2022',
    }
  ];

  getLogs() {
    return this.nameChangeLogs;
    // return this.nameChangeLogs.slice();
  }
  nameChanged(newName: string, oldName: string) {
    const currentTime = new Date().toString();
    // Add a log to the start of the array
    this.nameChangeLogs.unshift({ newName: newName, changeTime: currentTime, oldName: oldName });
  }
}
