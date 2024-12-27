import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import images from "@/components/about-me/TechStack/ImageData";
import TechStackImagePanel from "@/components/about-me/TechStack/ImagePanel/TechStackImagePanel";

describe("TechStackImagePanel component", () => {
  it("should render all the images from ImageData", () => {
    const { getByAltText } = render(<TechStackImagePanel numItemPerRow={4} />);

    for (const imageData of images) {
      const renderedImg = getByAltText(imageData.description);
      expect(renderedImg).toBeInTheDocument();
    }
  });

  describe.each<[4 | 5 | 6, string, string, string, string]>([
    [4, "grid-cols-4", "col-span-4", "w-[calc(100%-0.5rem*3)]", "w-1/4"],
    [5, "grid-cols-5", "col-span-5", "w-[calc(100%-0.5rem*4)]", "w-1/5"],
    [6, "grid-cols-6", "col-span-6", "w-[calc(100%-0.5rem*5)]", "w-1/6"],
  ])(
    "with %d items per row",
    (numItemPerRow, gridCols, gridColsSpan, lastRowWidth, lastRowItemWidth) => {
      let container: HTMLElement;

      beforeEach(() => {
        const rendered = render(
          <TechStackImagePanel numItemPerRow={numItemPerRow} />
        );
        container = rendered.container;
      });

      it(`should be a grid with ${numItemPerRow} columns`, () => {
        const gridDiv = container.querySelector(".grid");
        expect(gridDiv).toBeInTheDocument();
        expect(gridDiv).toHaveClass(gridCols);
      });

      it(`should have a last row as a flex box with these classes: ${gridColsSpan}, ${lastRowWidth}`, () => {
        const flexDiv = container.querySelector(".grid > .flex");
        expect(flexDiv).toHaveClass(gridColsSpan);
        expect(flexDiv).toHaveClass(lastRowWidth);
      });

      it(`should have a last row where each item is ${lastRowItemWidth}`, () => {
        const itemsInLastRow = container.querySelectorAll(
          ".grid > .flex > div"
        );
        for (let i = 0; i < itemsInLastRow.length; i++) {
          const item = itemsInLastRow[i];
          expect(item).toHaveClass(lastRowItemWidth);
        }
      });

      it(`should have ${
        images.length % numItemPerRow
      } images in the last row if the number of images is ${
        images.length
      }`, () => {
        const imagesInLastRow = container.querySelectorAll(
          ".grid > .flex > div > img"
        );
        expect(imagesInLastRow).toHaveLength(images.length % numItemPerRow);
      });
    }
  );

});
