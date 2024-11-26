import { aboutMeImg } from "@/utils/images";
import Image from "next/image";

const AboutPanel = () => {
  return (
    <div className="relative w-full h-full flex justify-center flex-row-reverse my-12 gap-10">
      <div className="relative aspect-square">
        <Image src={aboutMeImg} alt="Profile Image" fill />
      </div>
      <div className="px-10 flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-right">(Evan) Yu Jun Zhao</h1>
        <p className="py-6 text-right text-lg">
          I'm a Full-Stack Software Engineer. <br/>
          I'm not a designer.
        </p>
        <div className="flex justify-end">
        <button className="btn btn-primary">Get Started</button>
        </div>
        
      </div>
    </div>
  );
};

export default AboutPanel;
