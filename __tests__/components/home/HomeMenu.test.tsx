import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HomeMenu from "@/components/Home/HomeMenu";
import navLinks from "@/components/Layout/Nav/NavLinks";

describe("HomeMenu component", () => {
  it("should render a nav element", () => {
    render(<HomeMenu />);

    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
  });

  it("should render a list of links", () => {
    render(<HomeMenu />);

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(navLinks.length);

    navLinks.forEach((item) => {
      const { name, isDisabled } = item;

      const link = screen.getByRole("link", { name });
      const listItem = link.closest("li");

      // each anchor link should have li as the parent.
      expect(listItem).toBeInTheDocument();

      if (isDisabled) {
        expect(listItem).toHaveClass("disabled");
        expect(link).toHaveClass("btn-main-menu-gray-effect hover:cursor-not-allowed");
      } else{
        expect(listItem).not.toHaveClass("disabled");
        expect(link).not.toHaveClass("hover:cursor-not-allowed");
        expect(link).toHaveClass("btn-main-menu-gradient-effect");
      }
    });
  });
});
