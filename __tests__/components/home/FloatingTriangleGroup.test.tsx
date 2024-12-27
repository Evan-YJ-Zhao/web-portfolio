import { render } from "@testing-library/react";
import FloatingTriangleGroup from "@/components/Home/FloatingTriangleGroup";

describe("FloatingTriangleGroup component", () => {
  it("should render 12 triangles when the screen is 1200px wide", () => {
    window.innerWidth = 1200;
    window.dispatchEvent(new Event("resize"));

    const { container } = render(<FloatingTriangleGroup />);

    expect(window.innerWidth).toBe(1200);
    const triangles = container.querySelectorAll(".floating-triangle");
    expect(triangles).toHaveLength(12);
  });
  it("should render 6 triangles when the screen is 640px wide", () => {
    window.innerWidth = 640;
    window.dispatchEvent(new Event("resize"));

    const { container } = render(<FloatingTriangleGroup />);

    expect(window.innerWidth).toBe(640);
    const triangles = container.querySelectorAll(".floating-triangle");
    expect(triangles).toHaveLength(6);
  });
  it("should render 0 triangles when the screen is 0px wide", () => {
    window.innerWidth = 0;
    window.dispatchEvent(new Event("resize"));

    const { container } = render(<FloatingTriangleGroup />);

    expect(window.innerWidth).toBe(0);
    const triangles = container.querySelectorAll(".floating-triangle");
    expect(triangles).toHaveLength(0);
  });
});
