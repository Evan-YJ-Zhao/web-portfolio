import { motion } from "framer-motion";
import { OptionalClassName } from "@/utils/commonTypes";

type Props = OptionalClassName & {
  children: React.ReactNode;
  title: string;
  titlePosition: "left" | "center" | "right";
};

const SectionWrapper = ({ children, className, title, titlePosition }: Props) => {
  let justifyAt = "";
  let shiftByMargin = "";

  switch(titlePosition){
    case "center":
      justifyAt = "justify-center";
      break;
    case "right":
      justifyAt = "justify-end";
      shiftByMargin = "mr-[4%]";
      break;
    default:
      justifyAt = "justify-start";
      shiftByMargin = "ml-[4%]";
      break 
  }

  return (
    <section className={`${className}`}>
      <div className={`relative flex ${justifyAt}`}>
        <motion.div
          className={`absolute ${shiftByMargin}
          tablet:top-1 desktop-sm:top-4
          border tablet:border-1 desktop-sm:border-2 border-primary 
          rounded-lg box-content shadow-md overflow-hidden z-[1]`}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2
            className="m-1 font-bold text-secondary 
          text-sm tablet:text-base desktop-sm:text-lg 
          text-wrap text-center"
          >
            {title}
          </h2>
        </motion.div>
      </div>

      {children}
    </section>
  );
};

export default SectionWrapper;
