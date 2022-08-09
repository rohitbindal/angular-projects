import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class ErrorService implements ErrorHandler {
  handleError(error: any): void {
    const errorText = 'This error was caught by a custom error handler service: ' + error;
    alert(errorText);

    //   if (typeof error === 'string') {
    //     alert(`An Error Occurred: ${error}`)
    //   }
    //   alert(`An Error Occurred: ${error.message}`)
    // }
  }
}
