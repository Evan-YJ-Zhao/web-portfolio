import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import timelineExperience from "@/components/AboutMe/Timeline/TimelineData";
import TimelineMobile from "@/components/AboutMe/Timeline/TimelineMobile";

const preventDefaultListener = (event: SubmitEvent) => {
  event.preventDefault();
};

describe("TimelineMobile component", () => {
  beforeAll(() => {
    // mocking HTMLDialogElement functions due to https://github.com/jsdom/jsdom/issues/3294
    HTMLDialogElement.prototype.showModal = jest.fn(function mock(
      this: HTMLDialogElement
    ) {
      this.open = true;
    });

    HTMLDialogElement.prototype.close = jest.fn(function mock(
      this: HTMLDialogElement
    ) {
      this.open = false;
    });

    HTMLFormElement.prototype.requestSubmit = jest.fn(function mock() {
      console.log("requestSubmit polyfill executed");
      const event = new Event("submit", { bubbles: true, cancelable: true });
      this.dispatchEvent(event);
    });
  });

  beforeEach(() => {
    render(<TimelineMobile />);
  });

  it("should contain all the timeline experience in a list", () => {
    const timelineList = screen.getByRole("list");
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

  it("should contain the timeline experience descriptions and two close buttons in a dialog modal, initially hidden", () => {
    const dialogModals = screen.getAllByRole("dialog", { hidden: true });

    for (let i = 0; i < timelineExperience.length; i++) {
      const { descriptions, title } = timelineExperience[i];
      const dialog = dialogModals[i];

      const closeButtons = within(dialog).getAllByRole("button", {
        hidden: true,
      });
      expect(closeButtons.length).toBe(2);

      const titleHeader = within(dialog).getByText(title);
      expect(titleHeader).toBeInTheDocument();

      // contain all the descriptions
      for (let j = 0; j < descriptions.length; j++) {
        const description = within(dialog).getByText(
          `${j + 1}) ${descriptions[j]}`
        );
        expect(description).toBeInTheDocument();
      }
    }
  });

  it("should open up the corresponding modal when a listitem is clicked", async () => {
    const timelineList = screen.getByRole("list");
    const timelineListItems = within(timelineList).getAllByRole("listitem");
    const dialogModals = screen.getAllByRole("dialog", { hidden: true });

    for (let i = 0; i < timelineListItems.length; i++) {
      const timelineListItem = timelineListItems[i];
      const dialog = dialogModals[i];

      expect(dialog as HTMLDialogElement).not.toHaveAttribute("open");
      // open dialog modal
      await userEvent.click(timelineListItem);
      expect(dialog as HTMLDialogElement).toHaveAttribute("open");
    }
  });

  it("should slightly change style to cmyk only for the selected listitem, other listitems have lofi (default) as the style theme", async () => {
    const timelineList = screen.getByRole("list");
    const timelineListItems = within(timelineList).getAllByRole("listitem");

    for (let i = 0; i < timelineListItems.length; i++) {
      const timelineListItem = timelineListItems[i];

      const lofiDivs = timelineListItem.querySelectorAll('[data-theme="lofi"]');
      expect(lofiDivs.length).toBe(2);

      await userEvent.click(timelineListItem);

      // only 2 divs have style changed
      const cmykDivs = timelineListItem.querySelectorAll('[data-theme="cmyk"]');
      expect(cmykDivs.length).toBe(2);

      // expect other listitems to have lofi
      const totalLofiDivs = document.querySelectorAll('[data-theme="lofi"]');
      expect(totalLofiDivs.length).toBe(timelineListItems.length * 2 - 2);
    }
  });

  it("should reset the style for the selected list item when user exits the modal,", async () => {
    const timelineList = screen.getByRole("list");
    const timelineListItems = within(timelineList).getAllByRole("listitem");
    const dialogModals = screen.getAllByRole("dialog", { hidden: true });

    for (let i = 0; i < timelineListItems.length; i++) {
      const timelineListItem = timelineListItems[i];
      const dialog = dialogModals[i];

      expect(dialog as HTMLDialogElement).not.toHaveAttribute("open");
      // open dialog modal
      await userEvent.click(timelineListItem);
      expect(dialog as HTMLDialogElement).toHaveAttribute("open");

      // expect theme changes
      const cmykDivs = timelineListItem.querySelectorAll('[data-theme="cmyk"]');
      expect(cmykDivs.length).toBe(2);

      // expect closing dialog modal
      const closeDialogButton = within(dialog).getByRole("button", {
        name: "close",
      });

      const form = closeDialogButton.closest("form");
      form && form.addEventListener("submit", preventDefaultListener);

      await userEvent.click(closeDialogButton);

      const lofiDivs = timelineListItem.querySelectorAll('[data-theme="lofi"]');
      expect(lofiDivs.length).toBe(2);

      form && form.removeEventListener("submit", preventDefaultListener);
    }
  });
});
