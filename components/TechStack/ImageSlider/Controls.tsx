import { motion } from "framer-motion";
import { memo, MouseEventHandler } from "react";
import { OptionalClassName } from "@/utils/commonTypes";

type Props = OptionalClassName & {
  leftControlClickHandler: MouseEventHandler<HTMLButtonElement>;
  rightControlClickHandler: MouseEventHandler<HTMLButtonElement>;
};

// Controls the image slider
const Controls = memo(
  ({
    className,
    leftControlClickHandler,
    rightControlClickHandler,
  }: Props) => {
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className={`${className} flex justify-between items-center`}
      >
        <button
          data-theme="cmyk"
          className="btn btn-circle hover:bg-primary border border-neutral"
          onClick={leftControlClickHandler}
        >
          &#x276E;
        </button>
        <button
          data-theme="cmyk"
          className="btn btn-circle hover:bg-primary border border-neutral"
          onClick={rightControlClickHandler}
        >
          &#x276F;
        </button>
      </motion.div>
    );
  }
);

export default Controls;
