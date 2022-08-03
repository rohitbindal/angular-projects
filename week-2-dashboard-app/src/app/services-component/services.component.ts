import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Log } from './log.model';
import { LoggerService } from './logger.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  providers: [LoggerService]
})
export class ServicesComponent implements OnInit {
  logs: Log[] = [];
  _name = 'Anonymous';
  constructor(private logger: LoggerService) { }

  ngOnInit(): void {
    this.logs = this.logger.getLogs();
  }

  // Method to use the logger service to log the name change.
  changeName(nameInput: string) {
    this.logger.nameChanged(nameInput, this._name);
    this._name = nameInput;
  }

}
