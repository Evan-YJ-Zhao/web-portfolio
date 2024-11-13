"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";
import ImageSlider from "@/components/ImageSlider/ImageSlider";
import SectionWrapper from "@/components/Wrapper/SectionWrapper";
import SwitchMotionButton from "@/components/MotionButton/SwitchMotionButton";
import TechStackPanel from "@/components/TechStackPanel/TechStackPanel";
import useWindowAttr from "@/hooks/useWindowAttr";

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
          className="relative w-full h-dvh bg-neutral"
          title="SKILLS"
          titlePosition="center"
        >
          <div></div>
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
            <ImageSlider key="image-slider" />
          ) : (
            <TechStackPanel key="techstack-panel" />
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
