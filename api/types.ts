export type ApiResponse<TResponseData = undefined> =
  | {
      success: true;
      data?: TResponseData;
    }
  | { success: false; error: ErrorData };

export enum ErrorType {
  // http errors
  BAD_REQUEST = "BAD_REQUEST",
  UNAUTHORIZED = "UNAUTHORIZED",
  NOT_FOUND = "NOT_FOUND",
  REQUEST_TIMEOUT = "REQUEST_TIMEOUT",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",

  // other custom errors
  UNEXPECTED_STATUS_CODE_RECEIVED = "UNEXPECTED_STATUS_CODE_RECEIVED",

  // fall back errors
  UNSUPPORTED_ERROR = "UNSUPPORTED_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR"
}

export type ErrorData = {
  type: ErrorType;
  message: string;
};
