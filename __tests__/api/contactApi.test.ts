import { getRequest, postRequest } from "@/api/apiRequests";
import { ContactFields, createContact, getHealth } from "@/api/contactApi";
import { StringValues } from "@/utils/types";

jest.mock("@/api/apiRequests", () => {
  return {
    postRequest: jest.fn(() => {}),
    getRequest: jest.fn(() => {}),
  };
});

// These functions are just returning getRequest postRequest
// and testing of GET and POST requests are in apiRequests.test.ts.
describe("contactApi", () => {
  describe("createContact", () => {
    it("should make a POST request to /contact", async () => {
      const testContactData: StringValues<ContactFields> = {
        firstName: "Test",
        lastName: "Tester",
        email: "foo@test.com",
        subject: "test subject",
        message: "test message",
      };

      await createContact(testContactData);
      expect(postRequest).toHaveBeenCalledWith("/contact", testContactData);
    });
  });

  describe("getHealth", () => {
    it("should make a GET request to /contact/health", async () => {
      await getHealth();
      expect(getRequest).toHaveBeenCalledWith("/contact/health");
    });
  });
});
