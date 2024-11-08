import {motion} from "framer-motion";
import { OptionalClassName } from "@/utils/commonTypes";

type Props = OptionalClassName & {
  children: React.ReactNode;
  title: string;
};

const SectionWrapper = ({ children, className, title }: Props) => {
  return (
    <section className={`${className}`}>
      <motion.div
        className="absolute left-[5%] top-[10%] max-w-[10%] max-h-[10%] 
          border border-primary rounded-lg box-content shadow-md overflow-hidden z-[1]"
        initial={{opacity: 0, x: -50}}
        animate={{opacity: 1, x: 0}}
      >
        <h2 className="m-1 font-bold text-secondary text-lg text-wrap">{title}</h2>
      </motion.div>

      {children}
    </section>
  );
};

export default SectionWrapper;
