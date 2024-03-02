import { HttpException, HttpStatus } from '@nestjs/common';

class ErrorHandler {
  private readonly error: any;
  private readonly message: any;
  private readonly filterMessage: any;
  constructor(error: Error, message = 'Error', filterMessage = true) {
    this.error = error;
    this.message = message;
    this.filterMessage = filterMessage;
    this.handleError();
  }

  handleError () {
    console.error(this.message + ' error', this.error);
    const errorStatus = this.error?.status ? this.error.status : HttpStatus.BAD_REQUEST
    if (errorStatus === HttpStatus.BAD_REQUEST && this.filterMessage) {
      throw new HttpException({error: true, message: this.error.message}, HttpStatus.BAD_REQUEST);
    }
    throw new HttpException(this.error, errorStatus);
  }
}

export default ErrorHandler;

