import createContact from "./createContact";

// Allows support the following fields
export const contactFields = [
  "firstName",
  "lastName",
  "email",
  "subject",
  "message",
] as const;

export type ContactFields = (typeof contactFields)[number];
export { createContact };
