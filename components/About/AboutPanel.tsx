import { aboutMeImg, githubNamedImg, linkedInColoredImg } from "@/utils/images";
import Image from "next/image";

const AboutPanel = () => {
  return (
    <div className="relative w-full flex flex-wrap justify-center flex-row-reverse mt-12 mb-16 gap-10">
      <div className="group relative indicator w-48 h-48 aspect-square rounded-full hover:bg-black">
        <a href="/contact-me">
          <span className="indicator-item indicator-center badge badge-primary rounded-lg group-hover:hidden">
            Click me to contact
          </span>
          <Image
            src={aboutMeImg}
            alt="Profile Image"
            className="border border-primary rounded-full 
              group-hover:shadow-lg group-hover:shadow-primary group-hover:border-2 laptop:group-hover:opacity-70"
            fill
          />
        </a>
      </div>
      <div className="px-10 flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-center tablet:text-right">(Evan) Yu Jun Zhao</h1>
        <p className="py-6 text-lg text-center tablet:text-right ">
          I'm a Full-Stack Software Engineer. <br />
          I'm not a designer.
        </p>
        <div className="flex justify-center tablet:justify-end gap-5">
          <a
            href="https://github.com/Yu-Jun-Zhao/"
            target="_blank"
            className="relative btn aspect-square bg-neutral border-neutral"
          >
            <Image src={githubNamedImg} alt="Link to my Github" fill />
          </a>
          <a
            href="https://www.linkedin.com/in/yu-jun-zhao/"
            target="_blank"
            className="relative btn aspect-square"
          >
            <Image src={linkedInColoredImg} alt="Link to my LinkedIn" fill />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPanel;
