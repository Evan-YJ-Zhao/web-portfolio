import { motion } from "framer-motion";
import Image from "next/image";
import { linkedInColoredImg } from "@/utils/images";
import { LINKS } from "@/utils/links";
import { OptionalClassName } from "@/utils/types";

type Props = OptionalClassName & {
  iconWidth?: number;
  iconHeight?: number;
};

const LinkedInLinkButton = ({
  className,
  iconWidth = 35,
  iconHeight = 35,
}: Props) => {
  return (
    <motion.a
      data-theme="cmyk"
      href={LINKS.LINKEDIN_PROFILE}
      target="_blank"
      className={`${className} p-2 btn btn-circle btn-ghost hover:bg-transparent`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.8 } }}
    >
      <Image
        src={linkedInColoredImg}
        alt="LinkedIn Image"
        width={iconWidth}
        height={iconHeight}
      />
    </motion.a>
  );
};

export default LinkedInLinkButton;
