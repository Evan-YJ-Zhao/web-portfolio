import { act, renderHook, waitFor } from "@testing-library/react";
import useWindowAttr from "@/hooks/useWindowAttr";

describe("useWindowAttr hook", () => {
  it("should return a windowSize matching the window inner width and height", async () => {
    window.innerWidth = 1200;
    window.innerHeight = 600;

    const { result } = renderHook(() => useWindowAttr());

    // after useEffect runs
    await waitFor(() => {
      expect(result.current.windowSize.width).toBe(1200);
      expect(result.current.windowSize.height).toBe(600);
    });
  });

  it("should return a windowSize matching the window inner width and height", async () => {
    const { result } = renderHook(() => useWindowAttr());
    await waitFor(() => {
      expect(result.current.isInClient).toBe(true);
    });
  });

  it("should return a new windowSize when screen resizes", async () => {
    window.innerWidth = 1200;
    window.innerHeight = 600;

    const { result } = renderHook(() => useWindowAttr());
    
    act(() => {
      window.innerWidth = 500;
      window.innerHeight = 800;

      window.dispatchEvent(new Event("resize"));
    });

    await waitFor(() => {
      expect(result.current.windowSize.width).toBe(500);
      expect(result.current.windowSize.height).toBe(800);
    });
  });
});
