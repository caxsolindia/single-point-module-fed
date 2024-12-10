import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService implements ErrorHandler {
  handleError(error: undefined | Error): void {
    console.error('An error occurred:', error);
  }

  throwError(message: string): void {
    alert(message);
  }
}
