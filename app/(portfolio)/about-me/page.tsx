"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";
import SectionWrapper from "@/components/Wrapper/SectionWrapper";
import SwitchMotionButton from "@/components/MotionButton/SwitchMotionButton";
import TechSkillsPanel from "@/components/TechSkills/TechSkillsPanel";
import TechStackImageSlider from "@/components/TechStack/ImageSlider/TechStackImageSlider";
import useWindowAttr from "@/hooks/useWindowAttr";
import TechStackImagePanel from "@/components/TechStack/ImagePanel/TechStackImagePanel";

const page = () => {
  const [showImageSlider, setShowImageSlider] = useState(true);
  const { isInClient, windowSize } = useWindowAttr();
  const { width } = windowSize;

  const imageSwitchButtonOnClickHandler = useCallback(() => {
    setShowImageSlider((prev) => !prev);
  }, []);

  if (!isInClient) {
    return null;
  } else if (width < 1024) {
    // mobile view
    return (
      <>
        <SectionWrapper
          className="relative w-full bg-neutral"
          title="SKILLS"
          titlePosition="center"
        >
          <TechStackImagePanel numItemPerRow={4}/>
        </SectionWrapper>
      </>
    );
  }

  return (
    <>
      <SectionWrapper
        className="relative w-full h-[36rem] bg-neutral overflow-hidden"
        title="Technical Skills"
        titlePosition="left"
      >
        <AnimatePresence mode="wait">
          {showImageSlider ? (
            <TechStackImageSlider key="image-slider" />
          ) : (
            <TechSkillsPanel key="techstack-panel" />
          )}
        </AnimatePresence>

        <SwitchMotionButton
          className="absolute bottom-0 right-[2%]"
          clickHandler={imageSwitchButtonOnClickHandler}
        />
      </SectionWrapper>
    </>
  );
};

export default page;
