export class customError extends Error {
  constructor(statusCode, message) {
    super(message); // Calls the parent Error constructor
    this.statusCode = statusCode;
  }
}


