
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TechSkillsPanel from "@/components/AboutMe/TechSkills/TechSkillsPanel";
import techStack from "@/components/AboutMe/TechSkills/TechSkillsData";


describe("TechSkillsPanel component", () => {

  beforeEach(() => {
    render(<TechSkillsPanel />);
    
  })

  it("should render all the images from the techstack", () => {
    for(const techInfo of techStack){
      const image = screen.getByAltText(techInfo.name);
      expect(image).toBeInTheDocument();
    }
  });

  it("should mention all the tech names from each tech item", () => {
    for(const techInfo of techStack){
      const techString = techInfo.techs.join(", ");
      const techSpan = screen.getByText(techString);
      expect(techSpan).toBeInTheDocument();
    }
  })

})