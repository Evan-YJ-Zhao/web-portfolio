/**
 * @jest-environment node
 */

import "@testing-library/jest-dom";
import { renderToString } from "react-dom/server";
import RootLayout from "@/app/layout";

const ChildComponent = () => <div data-testid="child">Test Content</div>;

describe("RootLayout", () => {
  it("should have a main, a footer, and a copyright text", () => {
    // difficult to test rootlayout because it contains html and body element
    // converting to string to test if certain elements exist.
    const rootLayoutString = renderToString(
      <RootLayout>
        <ChildComponent />
      </RootLayout>
    );

    expect(rootLayoutString).toContain("</main>");
    expect(rootLayoutString).toContain("</footer>");
    expect(rootLayoutString).toContain("Copyright");
  });
});
