import { render } from "@testing-library/react";
import HomePage from "@/app/page";
import HomeMenu from "@/components/home/HomeMenu";
import FloatingTriangleGroup from "@/components/home/FloatingTriangleGroup";

jest.mock("@/components/home/HomeMenu", () =>
  jest.fn(() => <div>MockedHomeMenu</div>)
);

jest.mock("@/components/home/FloatingTriangleGroup", () =>
  jest.fn(() => <div>MockedFloatingTriangleGroup</div>)
);

describe("Home Page", () => {
  it("renders the HomeMenu once", () => {
    render(<HomePage />);

    expect(HomeMenu).toHaveBeenCalledTimes(1);

    // ensures that some classNames are passed
    expect(HomeMenu).toHaveBeenCalledWith(
      expect.objectContaining({ className: expect.any(String) }),
      expect.anything()
    );
    
  });

  it("renders the FloatingTriangleGroup", () => {
    render(<HomePage />);

    expect(FloatingTriangleGroup).toHaveBeenCalledTimes(1);

    expect(FloatingTriangleGroup).toHaveBeenCalledWith(
      expect.objectContaining({ className: expect.any(String) }),
      expect.anything()
    );
  });
});
