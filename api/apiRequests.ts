import { JSONObject } from "@/utils/types";
import axiosInstance from "./axiosInstance";
import { ApiError } from "./errors";
import { ApiResponse, ErrorType } from "./types";

export const getRequest = async <TResponseData>(
  url: string
): Promise<ApiResponse<TResponseData>> => {
  try {
    const response = await axiosInstance.get<TResponseData>(url);

    return { success: true, data: response.data };
  } catch (error) {
    const success = false;
    let errorType = ErrorType.UNKNOWN_ERROR;
    let message = "Unknown Error";

    // Should also catch UnexpectedStatusCodeError
    if (error instanceof ApiError) {
      errorType = error.errorType;
      message = error.message;
    }

    return { success, error: { type: errorType, message } };
  }
};

export const postRequest = async <TResponseData>(
  url: string,
  body: JSONObject
): Promise<ApiResponse<TResponseData>> => {
  try {
    const response = await axiosInstance.post<TResponseData>(url, body);
    
    return {success: true, data: response.data};
    
  } catch (error) {
    const success = false;
    let errorType = ErrorType.UNKNOWN_ERROR;
    let message = "Unknown Error";

    // Should also catch UnexpectedStatusCodeError
    if (error instanceof ApiError) {
      errorType = error.errorType;
      message = error.message;
    }

    return { success, error: { type: errorType, message } };
  }
};
