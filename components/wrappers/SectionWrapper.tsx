import { motion } from "framer-motion";
import { OptionalClassName } from "@/utils/types";

type Props = OptionalClassName & {
  children: React.ReactNode;
  title: string;
  titlePosition: "left" | "center" | "right";
};

const SectionWrapper = ({
  children,
  className = "",
  title,
  titlePosition,
}: Props) => {
  let justifyAt = "justify-start";
  let shiftByMargin = "ml-[5%]";
  let position = "absolute";

  switch (titlePosition) {
    case "center":
      justifyAt = "justify-center";
      shiftByMargin = "";
      position = "relative";
      break;
    case "right":
      justifyAt = "justify-end";
      shiftByMargin = "mr-[5%]";
      break;
    default:
      break;
  }

  return (
    <section className={`mb-4 ${className}`}>
      <div className={`relative flex ${justifyAt}`}>
        <motion.div
          className={`${position} ${shiftByMargin}
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
      <div
        className="relative w-full h-[1px] laptop:h-[1.5px] bottom-1 justify-self-center bg-gradient-to-r 
        from-transparent via-primary to-transparent
        laptop:from-15% laptop:via-50% laptop:to-85%"
      />
    </section>
  );
};

export default SectionWrapper;
