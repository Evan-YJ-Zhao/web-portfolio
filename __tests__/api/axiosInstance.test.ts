import axiosInstance from "@/api/axiosInstance";

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

  describe("second handler", () => {});
});
