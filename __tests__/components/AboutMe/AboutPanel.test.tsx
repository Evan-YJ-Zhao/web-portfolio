import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AboutPanel from "@/components/AboutMe/AboutPanel";
import LINKS from "@/utils/links";
import NAMES from "@/utils/names";

describe("AboutPanel component", () => {
  beforeEach(() => {
    render(<AboutPanel />);
  });

  it("should contain my name", () => {
    const name = screen.getByText(NAMES.FULL);
    expect(name).toBeInTheDocument();
  });
  it("should contain all the links from LINKS", () => {
    const links = screen.getAllByRole("link");

    for (const key in LINKS) {
      const url = LINKS[key];
      expect(links.some((link) => link.getAttribute("href") === url)).toBe(
        true
      );
    }
  });
  it("should contain a profile img", () => {
    const image = screen.getByAltText("Profile Image");
    expect(image.getAttribute("src")).toBeTruthy();
  });
});
