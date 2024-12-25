import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AboutMePage from "@/app/(portfolio)/about-me/page";
import SectionWrapper from "@/components/wrappers/SectionWrapper";
import { MouseEventHandler } from "react";

jest.mock("@/components/wrappers/SectionWrapper", () =>
  jest.fn(
    ({
      children,
      title,
      titlePosition,
    }: {
      children: React.ReactNode;
      title: string;
      titlePosition: string;
    }) => (
      <div
        data-testid="mocked-section-wrapper"
        data-title={title}
        data-position={titlePosition}
      >
        {children}
      </div>
    )
  )
);
jest.mock(
  "@/components/about-me/TechStack/ImagePanel/TechStackImagePanel",
  () =>
    jest.fn(() => (
      <div data-testid="mocked-tech-stack-image-panel">
        Mocked TechStackImagePanel
      </div>
    ))
);

jest.mock(
  "@/components/about-me/TechStack/ImageSlider/TechStackImageSlider",
  () =>
    jest.fn(() => (
      <div data-testid="mocked-tech-stack-image-slider">
        Mocked TechStackImageSlider
      </div>
    ))
);

jest.mock("@/components/about-me/TechSkills/TechSkillsPanel", () =>
  jest.fn(() => (
    <div data-testid="mocked-tech-skills-panel">Mocked TechSkillsPanel</div>
  ))
);

jest.mock("@/components/about-me/SwitchMotionButton", () =>
  jest.fn(
    ({
      onClickHandler,
    }: {
      onClickHandler: MouseEventHandler<HTMLButtonElement>;
    }) => (
      <button
        data-testid="mocked-switch-motion-button"
        onClick={onClickHandler}
      >
        Mocked Switch Motion Button
      </button>
    )
  )
);

jest.mock("@/components/about-me/Timeline/TimelineMobile", () =>
  jest.fn(() => (
    <div data-testid="mocked-timeline-mobile">Mocked TimelineMobile</div>
  ))
);
jest.mock("@/components/about-me/Timeline/Timeline", () =>
  jest.fn(() => <div data-testid="mocked-timeline">Mocked Timeline</div>)
);

jest.mock("@/components/about-me/AboutPanel", () =>
  jest.fn(() => <div data-testid="mocked-about-panel">Mocked About Panel</div>)
);

const componentNameToTestId = new Map<string, string>([
  ["TechStackImagePanel", "mocked-tech-stack-image-panel"],
  ["TechStackImageSlider", "mocked-tech-stack-image-slider"],
  ["TechSkillsPanel", "mocked-tech-skills-panel"],
  ["TimelineMobile", "mocked-timeline-mobile"],
  ["Timeline", "mocked-timeline"],
  ["AboutPanel", "mocked-about-panel"],
]);

const laptopViewWidth = 1024;
const tabletViewWidth = 768;

describe("About Me Page", () => {
  it("should render a total of 3 Section Wrappers", () => {
    const { getAllByTestId } = render(<AboutMePage />);

    expect(SectionWrapper).toHaveBeenCalledTimes(3);
    expect(getAllByTestId("mocked-section-wrapper")).toHaveLength(3);
  });

  describe("First Section Wrapper", () => {
    it.each([
      ["center", "SKILLS", laptopViewWidth - 1, "<"],
      ["left", "Technical Skills", laptopViewWidth, "==="],
      ["left", "Technical Skills", laptopViewWidth + 1, ">"],
    ])(
      "should have a %s title called %s when the screen width (%d) %s laptopViewWidth (1024 px)",
      (
        titlePosition: string,
        title: string,
        screenWidth: number,
        operatorSymbol: string
      ) => {
        window.innerWidth = screenWidth;
        const { getAllByTestId } = render(<AboutMePage />);

        const sectionWrappers = getAllByTestId("mocked-section-wrapper");
        const firstSectionWrapper = sectionWrappers[0];

        // indicates this SectionWrapper was called with props values: SKILLS and center
        expect(firstSectionWrapper).toHaveAttribute("data-title", title);
        expect(firstSectionWrapper).toHaveAttribute(
          "data-position",
          titlePosition
        );
      }
    );

    it("should contain TechStackImagePanel and NOT (TechStackImageSlider, TechSkillsPanel, SwitchMotionButton) when the screen width < laptopViewWidth (1024 px)", () => {
      window.innerWidth = laptopViewWidth - 1;
      const { getByTestId, getAllByTestId, queryByTestId } = render(
        <AboutMePage />
      );

      const sectionWrappers = getAllByTestId("mocked-section-wrapper");
      const firstSectionWrapper = sectionWrappers[0];

      const techStackImagePanel = getByTestId("mocked-tech-stack-image-panel");
      const techStackImageSlider = queryByTestId(
        "mocked-tech-stack-image-slider"
      );
      const techSkillsPanel = queryByTestId("mocked-tech-skills-panel");
      const switchMotionButton = queryByTestId("mocked-switch-motion-button");

      expect(firstSectionWrapper).toBeInTheDocument();
      expect(techStackImagePanel).toBeInTheDocument();
      expect(firstSectionWrapper).toContainElement(techStackImagePanel);

      // Asserting that these components should not be rendered
      expect(techStackImageSlider).not.toBeInTheDocument();
      expect(techSkillsPanel).not.toBeInTheDocument();
      expect(switchMotionButton).not.toBeInTheDocument();
    });

    it.each([[laptopViewWidth], [laptopViewWidth + 1]])(
      "should NOT contain TechStackImagePanel when the screen width (%d px) >= laptopViewWidth (1024 px)",
      (screenWidth: number) => {
        window.innerWidth = screenWidth;
        const { queryByTestId } = render(<AboutMePage />);
        const techStackImagePanel = queryByTestId(
          "mocked-tech-stack-image-panel"
        );
        expect(techStackImagePanel).not.toBeInTheDocument();
      }
    );

    it.each([
      ["TechStackImageSlider", "TechSkillsPanel", laptopViewWidth, 0],
      ["TechStackImageSlider", "TechSkillsPanel", laptopViewWidth + 1, 0],
      ["TechSkillsPanel", "TechStackImageSlider", laptopViewWidth, 1],
      ["TechSkillsPanel", "TechStackImageSlider", laptopViewWidth + 1, 1],
    ])(
      "should contain %s and SwitchMotionButton but NOT %s when the screen width (%d px) >= laptopViewWidth (1024 px) AND switch button is clicked %d times",
      async (
        expectedComponent: string,
        notExpectedComponent: string,
        screenWidth: number,
        numberOfSwitchButtonClicks: number
      ) => {
        window.innerWidth = screenWidth;
        const { getAllByTestId, getByTestId, queryByTestId, debug } = render(
          <AboutMePage />
        );
        const sectionWrappers = getAllByTestId("mocked-section-wrapper");
        const firstSectionWrapper = sectionWrappers[0];
        const switchButton = getByTestId("mocked-switch-motion-button");

        for (let i = 0; i < numberOfSwitchButtonClicks; i++) {
          await userEvent.click(switchButton);
        }

        const renderedComponent = getByTestId(
          componentNameToTestId.get(expectedComponent) || ""
        );
        const notRenderedComponent = queryByTestId(
          componentNameToTestId.get(notExpectedComponent) || ""
        );
        expect(renderedComponent).toBeInTheDocument();
        expect(firstSectionWrapper).toContainElement(renderedComponent);
        expect(firstSectionWrapper).toContainElement(switchButton);
        expect(notRenderedComponent).not.toBeInTheDocument();
      }
    );
  });

  describe("Second Section Wrapper", () => {
    it.each([
      ["center", laptopViewWidth - 1, "<"],
      ["left", laptopViewWidth, "==="],
      ["left", laptopViewWidth + 1, ">"],
    ])(
      "should have a %s title called Experience when the screen width (%d) %s laptopViewWidth (1024 px)",
      (titlePosition: string, screenWidth: number, operatorSymbol: string) => {
        window.innerWidth = screenWidth;
        const { getAllByTestId } = render(<AboutMePage />);

        const sectionWrappers = getAllByTestId("mocked-section-wrapper");
        const secondSectionWrapper = sectionWrappers[1];

        expect(secondSectionWrapper).toHaveAttribute(
          "data-title",
          "Experience"
        );
        expect(secondSectionWrapper).toHaveAttribute(
          "data-position",
          titlePosition
        );
      }
    );

    it.each([
      ["TimelineMobile", "Timeline", tabletViewWidth - 1, "<"],
      ["Timeline", "TimelineMobile", tabletViewWidth, "==="],
      ["Timeline", "TimelineMobile", tabletViewWidth + 1, ">"],
    ])(
      "should contain %s AND NOT %s when the screen width (%d px) %s tabletViewWidth (768 px)",
      (
        expectedComponent: string,
        unExpectedComponent: string,
        screenWidth: number,
        operatorSymbol: string
      ) => {
        window.innerWidth = screenWidth;
        const { getAllByTestId, getByTestId, queryByTestId } = render(
          <AboutMePage />
        );
        const sectionWrappers = getAllByTestId("mocked-section-wrapper");
        const secondSectionWrapper = sectionWrappers[1];

        const renderedComponent = getByTestId(
          componentNameToTestId.get(expectedComponent) || ""
        );

        const notRenderedComponent = queryByTestId(
          componentNameToTestId.get(unExpectedComponent) || ""
        );

        expect(renderedComponent).toBeInTheDocument();
        expect(secondSectionWrapper).toContainElement(renderedComponent);
        expect(notRenderedComponent).not.toBeInTheDocument();
      }
    );
  });

  describe("Third Section Wrapper", () => {
    it.each([
      ["center", laptopViewWidth - 1, "<"],
      ["left", laptopViewWidth, "==="],
      ["left", laptopViewWidth + 1, ">"],
    ])(
      "should have a %s title called About Me when the screen width (%d) %s laptopViewWidth (1024 px)",
      (titlePosition: string, screenWidth: number, operatorSymbol: string) => {
        window.innerWidth = screenWidth;
        const { getAllByTestId } = render(<AboutMePage />);

        const sectionWrappers = getAllByTestId("mocked-section-wrapper");
        const thirdSectionWrapper = sectionWrappers[2];

        expect(thirdSectionWrapper).toHaveAttribute("data-title", "About Me");
        expect(thirdSectionWrapper).toHaveAttribute(
          "data-position",
          titlePosition
        );
      }
    );

    it("should contain the AboutPanel", () => {
      const { getAllByTestId, getByTestId } = render(<AboutMePage />);

      const sectionWrappers = getAllByTestId("mocked-section-wrapper");
      const thirdSectionWrapper = sectionWrappers[2];

      const aboutPanel = getByTestId("mocked-about-panel");
      expect(aboutPanel).toBeInTheDocument();
      expect(thirdSectionWrapper).toContainElement(aboutPanel);
    });
  });
});
