import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SwitchMotionButton from "@/components/AboutMe/SwitchMotionButton";

const SWITCH_MOTION_ROLE = "A switch button to toggle between components";

describe("SwitchMotionButton component", () => {
  let testCounter = 0;
  const testClickHandler = jest.fn(() => {
    testCounter++;
  });

  beforeEach(() => {
    render(<SwitchMotionButton onClickHandler={testClickHandler} />);
  });

  it("should be rendered in the component", () => {
    const switchMotionButton = screen.getByRole("button", {
      name: SWITCH_MOTION_ROLE,
    });
    expect(switchMotionButton).toBeInTheDocument();
  });

  it("should accept a click handler function", async () => {
    const switchMotionButton = screen.getByRole("button", {
      name: SWITCH_MOTION_ROLE,
    });
    expect(testCounter).toBe(0);
    await userEvent.click(switchMotionButton);
    expect(testCounter).toBe(1);
    expect(testClickHandler).toHaveBeenCalled();
  });
});
