import images from "@/components/AboutMe/TechStack/ImageData";

describe("TechStack ImageData", () => {
  it("should contain at least one image", () => {
    expect(images.length).toBeGreaterThanOrEqual(1);
  });
});
