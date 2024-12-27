import { motion } from "framer-motion";
import { memo, MouseEventHandler } from "react";
import { OptionalClassName } from "@/utils/types";

type Props = OptionalClassName & {
  leftControlOnClickHandler: MouseEventHandler<HTMLButtonElement>;
  rightControlOnClickHandler: MouseEventHandler<HTMLButtonElement>;
};

// Controls the image slider
const Controls = memo(
  ({
    className = "",
    leftControlOnClickHandler,
    rightControlOnClickHandler,
  }: Props) => {
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className={`flex justify-between items-center ${className}`}
      >
        <button
          data-theme="cmyk"
          className="btn btn-circle hover:bg-primary border border-neutral"
          onClick={leftControlOnClickHandler}
        >
          &#x276E;
        </button>
        <button
          data-theme="cmyk"
          className="btn btn-circle hover:bg-primary border border-neutral"
          onClick={rightControlOnClickHandler}
        >
          &#x276F;
        </button>
      </motion.div>
    );
  }
);

export default Controls;
