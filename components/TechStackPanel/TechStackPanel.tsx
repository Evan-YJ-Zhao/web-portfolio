import { motion } from "framer-motion";
import Image from "next/image";
import techStack, { TechInfo } from "./TechStackData";

const TechStackPanel = () => {
  return (
    <div className="relative w-full h-full flex justify-center items-center overflow-hidden bg-neutral">
      <ul className="w-3/5 h-2/3">
        {techStack.map((t: TechInfo) => (
          <li className="flex w-full h-[calc(100%/7)] mt-2 mb-2 border-2 border-primary rounded-lg">
            <span className="relative w-[5%] m-1 ml-2">
              <Image src={t.icon} alt={t.name} fill/>
            </span>
            <span className="text-center self-center text-lg font-bold ">{t.name}</span>
            <span className="flex-grow text-end self-center mr-3 text-lg">
              {t.techs.join(", ")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechStackPanel;
