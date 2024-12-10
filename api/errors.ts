import { ErrorType } from "./types";

export class ApiError extends Error {
  public errorType: ErrorType;
  constructor(message: string, errorType: ErrorType){
    super(message);
    this.name = "Api Error";
    this.errorType = errorType;
  }
}

// Not used at the moment
export class UnexpectedStatusCodeError extends ApiError {
  public statusCode: number;
  constructor(statusCode: number) {
    super("Received an unexpected status code.", ErrorType.UNEXPECTED_STATUS_CODE_RECEIVED);
    this.name = "UnexpectedStatusCodeError";
    this.statusCode = statusCode;
  }
}


