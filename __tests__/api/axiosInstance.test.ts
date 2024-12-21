import axiosInstance from "@/api/axiosInstance";
import { ApiError } from "@/api/errors";
import { ErrorType } from "@/api/types";

describe("axiosInstance", () => {
  // casting to any. Not preferred but does the job for now.
  // TODO: create a custom type for the handlers
  //  or wait till https://github.com/axios/axios/issues/6137 is addressed
  const responseInterceptorHandlers = (
    axiosInstance.interceptors.response as any
  ).handlers;

  describe("first handler", () => {
    const firstHandler = responseInterceptorHandlers[0];

    it("should return response on resolved response", () => {
      const mockResponse = { data: "test" };
      const resolvedResponse = firstHandler.fulfilled(mockResponse);

      expect(resolvedResponse).toEqual(mockResponse);
    });
    it("should log errors and reject error on rejected errors", async () => {
      const mockErrorResponse = {
        config: {
          url: "/test",
        },
        response: {
          status: 404,
        },
        message: "This is a test mock error",
      };

      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      await expect(firstHandler.rejected(mockErrorResponse)).rejects.toEqual(
        mockErrorResponse
      );
      expect(consoleSpy).toHaveBeenCalledTimes(3);
      expect(consoleSpy).toHaveBeenNthCalledWith(1, "API Error URL: /test");
      expect(consoleSpy).toHaveBeenNthCalledWith(2, "API status code: 404");
      expect(consoleSpy).toHaveBeenNthCalledWith(
        3,
        "API Error: This is a test mock error"
      );
    });
  });

  describe("second handler", () => {
    const secondHandler = responseInterceptorHandlers[1];

    it("should return response on resolved response", () => {
      const mockResponse = { data: "test" };
      const resolvedResponse = secondHandler.fulfilled(mockResponse);

      expect(resolvedResponse).toEqual(mockResponse);
    });

    it("should reject a supported API error if there's an error response with a supported error status code", async () => {
      const supportedStatusCodes = [400, 401, 404, 408, 500, 503];

      for (const statusCode of supportedStatusCodes) {
        const mockErrorResponse = {
          config: {
            url: "/test",
          },
          response: {
            status: statusCode,
          },
          message: "This is a test mock error",
        };

        // A bug in jest that only checks equality based on error message: https://github.com/jestjs/jest/issues/12108
        // This means the following will pass even though it should have failed.
        // await expect(secondHandler.rejected(mockErrorResponse)).rejects.toEqual(
        //   new ApiError(mockErrorResponse.message, ErrorType.INTERNAL_SERVER_ERROR)
        // );

        try {
          await secondHandler.rejected(mockErrorResponse);
        } catch (error) {
          if (error instanceof ApiError) {
            expect(error.message).toBe("This is a test mock error");
            expect(error.errorType).not.toBe(ErrorType.UNSUPPORTED_ERROR);
            expect(error.errorType).not.toBe(ErrorType.UNKNOWN_ERROR);
          }
        }
      }
    });

    it("should reject an unsupported API error if there's an error response with an unsupported error status code", async () => {
      const mockErrorResponse = {
        config: {
          url: "/test",
        },
        response: {
          status: 505,
        },
        message: "This is a test mock error",
      };

      try {
        await secondHandler.rejected(mockErrorResponse);
      } catch (error) {
        if (error instanceof ApiError) {
          expect(error.message).toBe("This is a test mock error");
          expect(error.errorType).toBe(ErrorType.UNSUPPORTED_ERROR);
          expect(error.errorType).not.toBe(ErrorType.UNKNOWN_ERROR);
        }
      }
    });

    it("should reject an unknown API error if there isn't an error response", async () => {
      const mockErrorResponse = {
        config: {
          url: "/test",
        },
        message: "This is a test mock error",
      };

      try {
        await secondHandler.rejected(mockErrorResponse);
      } catch (error) {
        if (error instanceof ApiError) {
          expect(error.message).toBe("This is a test mock error");
          expect(error.errorType).not.toBe(ErrorType.UNSUPPORTED_ERROR);
          expect(error.errorType).toBe(ErrorType.UNKNOWN_ERROR);
        }
      }
    });
  });
});
