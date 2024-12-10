import { StringValues } from "@/utils/types";
import { getRequest, postRequest } from "./apiRequests";
import { ApiResponse } from "./types";

// Allows support the following fields
export const contactFields = [
  "firstName",
  "lastName",
  "email",
  "subject",
  "message",
] as const;

export type ContactFields = (typeof contactFields)[number];


// type of data response that the client consumes
// Fillers for now. May change this later.
type ContactResponseData = {
  message?: string;
};

export const createContact = async (contactData: StringValues<ContactFields>): Promise<ApiResponse<ContactResponseData>> => {
  return postRequest("/contact", contactData);
}

export const getHealth = async (): Promise<ApiResponse> => {
  return getRequest("/contact/health");
}