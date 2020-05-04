import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
  constructor() {}

  handleError(error: any): void {
    this.processError(error);
    throw error;
  }

  public processError(error: any) {
    console.log(error);
  }
}
