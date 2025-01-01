import { motion } from "framer-motion";
import { memo, MouseEventHandler } from "react";
import { OptionalClassName } from "@/utils/types";

type Props = OptionalClassName & {
  onClickHandler: MouseEventHandler<HTMLButtonElement>;
};

// TODO: decouple svg from button, allow passing svg as prop/children, move component to a resuable common folder.
const SwitchMotionButton = memo(({ className = "", onClickHandler }: Props) => {
  return (
    <motion.button
      aria-label="A switch button to toggle between components"
      className={`${className}`}
      onClick={onClickHandler}
      whileHover={{
        scale: 1.2,
      }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <motion.path
          d="M320-280h320v-400H320v400Zm80-80v-240h160v240H400Zm40-120h80v-80h-80v80ZM202.87-111.87q-37.78 0-64.39-26.61t-26.61-64.39v-554.26q0-37.78 26.61-64.39t64.39-26.61h554.26q37.78 0 64.39 26.61t26.61 64.39v554.26q0 37.78-26.61 64.39t-64.39 26.61H202.87Z"
          initial={{
            pathLength: 0,
            fill: "#5f6368",
          }}
          animate={{ pathLength: 1, fill: "#000000" }}
          transition={{ duration: 0.4 }}
        />
      </svg>
    </motion.button>
  );
});

export default SwitchMotionButton;
