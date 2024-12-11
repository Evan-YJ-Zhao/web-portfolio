import axios, { AxiosError } from "axios";
import { ApiError } from "./errors";
import { ErrorType } from "./types";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// logging errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.config?.url) {
      console.error(`API Error URL: ${error.config.url}`);
    }
    if (error.response) {
      console.error(`API status code: ${error.response.status}`);
    }

    console.error(`API Error: ${error.message}`);
    return Promise.reject(error);
  }
);

const statusCodeToErrorTypeMap = new Map<number, ErrorType>([
  [400, ErrorType.BAD_REQUEST],
  [401, ErrorType.UNAUTHORIZED],
  [404, ErrorType.NOT_FOUND],
  [408, ErrorType.REQUEST_TIMEOUT],
  [500, ErrorType.INTERNAL_SERVER_ERROR],
  [503, ErrorType.SERVICE_UNAVAILABLE],
]);

// throw custom errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      return Promise.reject(
        new ApiError(
          error.message,
          statusCodeToErrorTypeMap.get(error.response.status) ||
            ErrorType.UNSUPPORTED_ERROR
        )
      );
    } else {
      return Promise.reject(
        new ApiError(error.message, ErrorType.UNKNOWN_ERROR)
      );
    }
  }
);

export default axiosInstance;
