import { motion } from "framer-motion";
import Image from "next/image";
import techStack, { TechInfo } from "./TechStackData";

const listVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    x: -50,
    opacity: 0,
    transition: {
      staggerChildren: 0.1,
      duration: 0.8,
    },
  },
};

const listItemVariant = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: -50,
    opacity: 0,
  },
};

const TechStackPanel = () => {
  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <motion.ul
        className="w-3/5 h-2/3"
        variants={listVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {techStack.map((t: TechInfo) => (
          <motion.li
            key={t.id}
            className="flex w-full h-[calc(100%/7)] mt-2 mb-2 border-2 border-primary rounded-lg shadow-md"
            variants={listItemVariant}
          >
            <span className="relative w-[5%] m-1 ml-2">
              <Image src={t.icon} alt={t.name} fill />
            </span>
            <span className="text-center self-center text-lg font-bold ">
              {t.name}
            </span>
            <span className="flex-grow text-end self-center mr-3 text-lg">
              {t.techs.join(", ")}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default TechStackPanel;
