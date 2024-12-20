import { getRequest, postRequest } from "@/api/apiRequests";
import axiosInstance from "@/api/axiosInstance";
import { ApiError, UnexpectedStatusCodeError } from "@/api/errors";
import { ApiResponse, ErrorType } from "@/api/types";

jest.mock("@/api/axiosInstance");

const mockedAxiosInstance = axiosInstance as jest.Mocked<typeof axiosInstance>;

type TestResponseData = {
  id: number;
  message: string;
};

describe("apiRequests", () => {
  describe("getRequest", () => {
    it("should return success true and data on resolved response", async () => {
      const mockResponse = {
        data: { id: 1, message: "This is a test" },
        status: 200,
        statusText: "OK",
      };

      mockedAxiosInstance.get.mockResolvedValueOnce(mockResponse);
      const result: ApiResponse<TestResponseData> =
        await getRequest<TestResponseData>("url");

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(mockResponse.data);
      }
    });

    it("should return success false and error on rejected ApiError, UnexpectedStatusCodeError", async () => {
      const errorList = [
        new ApiError("Test error", ErrorType.BAD_REQUEST),
        new UnexpectedStatusCodeError(505),
      ];

      for (const error of errorList) {
        mockedAxiosInstance.get.mockRejectedValueOnce(error);
        const result: ApiResponse<TestResponseData> =
          await getRequest<TestResponseData>("url");

        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.type).toBe(error.errorType);
          expect(result.error.message).toBe(error.message);
        }
      }
    });
  });

  describe("postRequest", () => {});
});
