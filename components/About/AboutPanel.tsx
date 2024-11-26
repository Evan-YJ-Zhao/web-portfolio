import { aboutMeImg, githubNamedImg, linkedInColoredImg } from "@/utils/images";
import Image from "next/image";

const AboutPanel = () => {
  return (
    <div className="relative w-full h-full flex justify-center flex-row-reverse my-12 gap-10">
      <div className="relative aspect-square">
        <Image
          src={aboutMeImg}
          alt="Profile Image"
          className="border border-primary rounded-full"
          fill
        />
      </div>
      <div className="px-10 flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-right">(Evan) Yu Jun Zhao</h1>
        <p className="py-6 text-right text-lg">
          I'm a Full-Stack Software Engineer. <br />
          I'm not a designer.
        </p>
        <div className="flex justify-end gap-5">
          <a href="https://github.com/Yu-Jun-Zhao/" target="_blank" className="relative btn aspect-square">
            <Image src={githubNamedImg} alt="Link to my Github" fill />
          </a>
          <a href="https://www.linkedin.com/in/yu-jun-zhao/" target="_blank" className="relative btn aspect-square">
            <Image src={linkedInColoredImg} alt="Link to my LinkedIn" fill />
          </a>
        </div>
        
      </div>
    </div>
  );
};

export default AboutPanel;
