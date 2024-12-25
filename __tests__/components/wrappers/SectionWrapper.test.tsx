import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import SectionWrapper from "@/components/wrappers/SectionWrapper";

const MockedChildOne = jest.fn(() => (
  <p data-testid="mocked-child-one">Mocked Child One</p>
));
const MockedChildTwo = jest.fn(() => (
  <p data-testid="mocked-child-two">Mocked Child Two</p>
));

describe("SectionWrapper", () => {
  it("it is a section element", () => {
    const testTitle = "Test Title";
    render(
      <SectionWrapper title={testTitle}>
        <MockedChildOne />
      </SectionWrapper>
    );
    const section = screen.getByRole("region", {
      name: `${testTitle} Section`,
    });
    expect(section).toBeInTheDocument();
  });

  it("should render children components", () => {
    render(
      <SectionWrapper title="Test Title">
        <MockedChildOne /> <MockedChildTwo />{" "}
      </SectionWrapper>
    );

    const mockedChildOne = screen.getByTestId("mocked-child-one");
    const mockedChildTwo = screen.getByTestId("mocked-child-two");

    expect(mockedChildOne).toBeInTheDocument();
    expect(mockedChildTwo).toBeInTheDocument();
  });

  it("should render the h2 containing the title text", () => {
    const testTitle = "Test Title";
    render(
      <SectionWrapper title={testTitle}>
        <MockedChildOne />{" "}
      </SectionWrapper>
    );
    const heading = screen.getByRole("heading");
    const titleText = within(heading).getByText(testTitle);

    expect(heading).toBeInTheDocument();
    expect(titleText).toBeInTheDocument();
  });

  it("should have section title rendered on the left side when titlePostion is not specified", () => {
    const { container } = render(
      <SectionWrapper title="Test Title">
        <MockedChildOne />
      </SectionWrapper>
    );
    const divs = container.querySelectorAll("div");

    const outerDiv = divs[0];
    const innerDiv = divs[1];

    expect(outerDiv).toHaveClass("justify-start");
    expect(innerDiv).toHaveClass("absolute");
    expect(innerDiv).toHaveClass("ml-[5%]");
  });

  it("should have section title rendered on the left side when titlePostion === left", () => {
    const { container } = render(
      <SectionWrapper title="Test Title" titlePosition="left">
        <MockedChildOne />
      </SectionWrapper>
    );
    const divs = container.querySelectorAll("div");

    const outerDiv = divs[0];
    const innerDiv = divs[1];

    expect(outerDiv).toHaveClass("justify-start");
    expect(innerDiv).toHaveClass("absolute");
    expect(innerDiv).toHaveClass("ml-[5%]");
  });

  it("should have section title rendered in the center when titlePostion === center", () => {
    const { container } = render(
      <SectionWrapper title="Test Title" titlePosition="center">
        <MockedChildOne />
      </SectionWrapper>
    );
    const divs = container.querySelectorAll("div");

    const outerDiv = divs[0];
    const innerDiv = divs[1];

    expect(outerDiv).toHaveClass("justify-center");
    expect(innerDiv).toHaveClass("relative");
  });

  it("should have section title rendered in the center when titlePostion === right", () => {
    const { container } = render(
      <SectionWrapper title="Test Title" titlePosition="right">
        <MockedChildOne />
      </SectionWrapper>
    );
    const divs = container.querySelectorAll("div");

    const outerDiv = divs[0];
    const innerDiv = divs[1];

    expect(outerDiv).toHaveClass("justify-end");
    expect(innerDiv).toHaveClass("absolute");
    expect(innerDiv).toHaveClass("mr-[5%]");
  });
});
