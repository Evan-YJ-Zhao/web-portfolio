import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import images from "@/components/AboutMe/TechStack/ImageData";
import TechStackImageSlider from "@/components/AboutMe/TechStack/ImageSlider/TechStackImageSlider";

jest.mock("@/components/AboutMe/TechStack/ImageSlider/Core", () =>
  jest.fn(({ focusPosition, itemPositionRotation, sliderRotation }) => (
    <div
      data-testid="mocked-image-slider-core"
      data-focusposition={focusPosition}
      data-itempositionrotation={itemPositionRotation}
      data-sliderrotation={sliderRotation}
    >
      Mocked Image Slider Core
    </div>
  ))
);
jest.mock("@/components/AboutMe/TechStack/ImageSlider/Controls", () =>
  jest.fn(({ leftControlOnClickHandler, rightControlOnClickHandler }) => {
    return (
      <div data-testid="mocked-image-slider-control">
        <button
          data-testid="mocked-left-button"
          onClick={leftControlOnClickHandler}
        >
          left
        </button>
        <button
          data-testid="mocked-right-button"
          onClick={rightControlOnClickHandler}
        >
          right
        </button>
      </div>
    );
  })
);

jest.mock("@/components/AboutMe/TechStack/ImageData", () => ({
  __esModule: true,
  default: [],
}));

describe("TechStackImageSlider component unreachable case", () => {
  it("should have a rotation deg of 360 if there are no images", async () => {
    render(<TechStackImageSlider />);

    const core = screen.getByTestId("mocked-image-slider-core");
    expect(images.length).toBe(0)
    expect(core).toHaveAttribute("data-itempositionrotation", "360");
  });
});
