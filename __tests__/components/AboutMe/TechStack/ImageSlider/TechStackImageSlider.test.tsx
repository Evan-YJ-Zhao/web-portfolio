import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

describe("TechStackImageSlider component", () => {
  beforeEach(() => {
    render(<TechStackImageSlider />);
  });

  it("should contain the image slider core", () => {
    const core = screen.getByTestId("mocked-image-slider-core");
    expect(core).toBeInTheDocument();
  });

  it("should contain the image slider controls", () => {
    const controls = screen.getByTestId("mocked-image-slider-control");
    expect(controls).toBeInTheDocument();
  });

  it("should add sliderRotation by rotationDeg when the left control button is clicked", async () => {
    const core = screen.getByTestId("mocked-image-slider-core");
    const leftButton = screen.getByTestId("mocked-left-button");

    const itemPositionRotation = 360 / images.length;
    expect(core).toHaveAttribute(
      "data-itempositionrotation",
      `${itemPositionRotation}`
    );

    let currentSliderRotation = 0;
    expect(core).toHaveAttribute(
      "data-sliderrotation",
      `${currentSliderRotation}`
    );

    for (let i = 0; i < images.length; i++) {
      await userEvent.click(leftButton);
      currentSliderRotation += itemPositionRotation;
      expect(core).toHaveAttribute(
        "data-sliderrotation",
        `${currentSliderRotation}`
      );
    }
  });

  it("should focus on the previous image (round robin) when the left control button is clicked", async () => {
    const core = screen.getByTestId("mocked-image-slider-core");
    const leftButton = screen.getByTestId("mocked-left-button");

    let currentFocusPosition = 0;
    expect(core).toHaveAttribute(
      "data-focusposition",
      `${currentFocusPosition}`
    );

    for (let i = 0; i < images.length; i++) {
      await userEvent.click(leftButton);
      currentFocusPosition =
        currentFocusPosition - 1 >= 0
          ? currentFocusPosition - 1
          : images.length - 1;
      expect(core).toHaveAttribute(
        "data-focusposition",
        `${currentFocusPosition}`
      );
    }
  });

  it("should minus sliderRotation by rotationDeg when the right control button is clicked", async () => {
    const core = screen.getByTestId("mocked-image-slider-core");
    const rightButton = screen.getByTestId("mocked-right-button");

    const itemPositionRotation = 360 / images.length;
    expect(core).toHaveAttribute(
      "data-itempositionrotation",
      `${itemPositionRotation}`
    );

    let currentSliderRotation = 0;
    expect(core).toHaveAttribute(
      "data-sliderrotation",
      `${currentSliderRotation}`
    );

    for (let i = 0; i < images.length; i++) {
      await userEvent.click(rightButton);
      currentSliderRotation -= itemPositionRotation;
      expect(core).toHaveAttribute(
        "data-sliderrotation",
        `${currentSliderRotation}`
      );
    }
  });

  it("should focus on the next image (round robin) when the right control button is clicked", async () => {
    const core = screen.getByTestId("mocked-image-slider-core");
    const rightButton = screen.getByTestId("mocked-right-button");

    let currentFocusPosition = 0;
    expect(core).toHaveAttribute(
      "data-focusposition",
      `${currentFocusPosition}`
    );

    for (let i = 0; i < images.length; i++) {
      await userEvent.click(rightButton);
      currentFocusPosition =
        currentFocusPosition + 1 < images.length ? currentFocusPosition + 1 : 0;
      expect(core).toHaveAttribute(
        "data-focusposition",
        `${currentFocusPosition}`
      );
    }
  });
});
