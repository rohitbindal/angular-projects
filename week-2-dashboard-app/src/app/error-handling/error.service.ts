import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class ErrorService implements ErrorHandler {
  handleError(error: any): void {
    alert(error);

    //   if (typeof error === 'string') {
    //     alert(`An Error Occurred: ${error}`)
    //   }
    //   alert(`An Error Occurred: ${error.message}`)
    // }
  }
}
