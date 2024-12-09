import { motion } from "framer-motion";
import Image from "next/image";
import { MouseEventHandler } from "react";
import { OptionalClassName } from "@/utils/types";
import { mailImg } from "@/utils/images";

type Props = OptionalClassName & {
  onClickHandler: MouseEventHandler<HTMLButtonElement>;
  iconWidth?: number;
  iconHeight?: number;
};

// Use className to set the size of the button
const MailContactButton = ({ className = "", onClickHandler, iconWidth = 35, iconHeight = 35 }: Props) => {
  return (
    <motion.button
      data-theme="cmyk"
      className={`${className} btn btn-circle btn-ghost hover:bg-info`}
      onClick={onClickHandler}
      initial={{ opacity: 0, x: -500, border: "2px solid transparent" }}
      animate={{
        opacity: 1,
        x: 0,
        border: [
          "2px solid transparent",
          "2px solid #FAFAFA",
          "2px solid #333333",
          "2px solid #FAFAFA",
          "2px solid transparent",
        ],
        transition: {
          opacity: {
            delay: 2,
          },
          x: {
            duration: 0.1,
            delay: 2,
          },
          border: {
            duration: 1.5,
            delay: 2.1,
          },
        },
      }}
      exit={{ opacity: 0, x: 500 }}
      whileTap={{
        scale: 0.8,
      }}
    >
      <Image src={mailImg} alt="Contact Form Image" width={iconWidth} height={iconHeight} />
    </motion.button>
  );
};

export default MailContactButton;
