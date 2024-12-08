import { StringValues } from "@/utils/types";
import { ContactFields } from ".";
import axiosInstance from "../axiosInstance";
import { ApiError, UnexpectedStatusCodeError } from "../errors";
import { ApiResponse, ErrorType } from "../types";

type ContactResponseData = {
  status: "success" | "error";
  message?: string;
};

export default async (
  contactData: StringValues<ContactFields>
): Promise<ApiResponse<ContactResponseData>> => {
  try {
    const response = await axiosInstance.post<ContactResponseData>(
      "/contact",
      contactData
    );

    if (response.status !== 201)
      throw new UnexpectedStatusCodeError(response.status);

    const { status } = response.data;
    return { success: true, data: { status } };
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
