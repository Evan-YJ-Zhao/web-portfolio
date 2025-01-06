import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import timelineExperience from "@/components/AboutMe/Timeline/TimelineData";
import Timeline from "@/components/AboutMe/Timeline/Timeline";

describe("Timeline component", () => {
  beforeEach(() => {
    render(<Timeline />);
  });

  it("should contain all the timeline experience in the first list", () => {
    const timelineList = screen.getAllByRole("list")[0];
    const timelineListItems = within(timelineList).getAllByRole("listitem");

    expect(timelineListItems.length).toBe(timelineExperience.length);

    for (let i = 0; i < timelineExperience.length; i++) {
      const { startDate, endDate, title, organization } = timelineExperience[i];
      const timelineListItem = timelineListItems[i];

      const startDateDiv = within(timelineListItem).getByText(startDate);
      const titleDiv = within(timelineListItem).getByText(title);
      const orgEndDateDiv = within(timelineListItem).getByText(
        `${organization}, Ended in ${endDate}`
      );

      // just for clarity
      expect(startDateDiv).toBeInTheDocument();
      expect(titleDiv).toBeInTheDocument();
      expect(orgEndDateDiv).toBeInTheDocument();
    }
  });
  it("should contain the descriptions in a list for each timeline experience", () => {
    const timelineLists = screen.getAllByRole("list");
    timelineLists.shift();

    for (let i = 0; i < timelineExperience.length; i++) {
      const { descriptions } = timelineExperience[i];
      const descriptionList = timelineLists[i];

      // contain all the descriptions
      for (const description of descriptions) {
        expect(
          within(descriptionList).getByText(description)
        ).toBeInTheDocument();
      }
    }
  });

  it("should show the corresponding description when a timeline listitem is clicked", async () => {
    const timelineLists = screen.getAllByRole("list");
    const timelineList = timelineLists[0];
    const descriptionLists = timelineLists.slice(1);

    const timelineListItems = within(timelineList).getAllByRole("listitem");

    for (let i = 0; i < timelineListItems.length; i++) {
      const timelineListItem = timelineListItems[i];
      const descriptionList = descriptionLists[i];
      const descriptionDiv = descriptionList.closest("div");

      expect(descriptionDiv).toHaveClass("hidden");
      expect(descriptionDiv).not.toHaveClass("block");
      await userEvent.click(timelineListItem);
      expect(descriptionDiv).not.toHaveClass("hidden");
      expect(descriptionDiv).toHaveClass("block");
    }
  });

  it("should only show the descriptions of one timeline experience at a given time", async () => {
    const timelineLists = screen.getAllByRole("list");
    const timelineList = timelineLists[0];

    const timelineListItems = within(timelineList).getAllByRole("listitem");

    // on page load, expect only one description list is shown
    expect(document.querySelectorAll("div > .hidden").length).toBe(
      timelineExperience.length - 1
    );
    expect(document.querySelectorAll("div > .block").length).toBe(1);

    // on item clicked, expect only one description list is shown
    for (const timelineListItem of timelineListItems) {
      await userEvent.click(timelineListItem);
      expect(document.querySelectorAll("div > .hidden").length).toBe(
        timelineExperience.length - 1
      );
      expect(document.querySelectorAll("div > .block").length).toBe(1);
    }
  });

  it("should slightly change style to cmyk only for the selected listitem, other listitems have lofi (default) as the style theme", async () => {
    const timelineList = screen.getAllByRole("list")[0];
    const timelineListItems = within(timelineList).getAllByRole("listitem");

    for (let i = 0; i < timelineListItems.length; i++) {
      const timelineListItem = timelineListItems[i];

      const lofiDivs = timelineListItem.querySelectorAll('[data-theme="lofi"]');
      expect(lofiDivs.length).toBe(2);

      await userEvent.click(timelineListItem);

      // only 2 divs have style changed
      const cmykDivNum = 2;
      const cmykDivs = timelineListItem.querySelectorAll('[data-theme="cmyk"]');
      expect(cmykDivs.length).toBe(cmykDivNum);

      // expect other listitems to have lofi
      const totalLofiDivs = document.querySelectorAll('[data-theme="lofi"]');
      expect(totalLofiDivs.length).toBe(
        timelineListItems.length * 2 - cmykDivNum
      );
    }
  });
});
