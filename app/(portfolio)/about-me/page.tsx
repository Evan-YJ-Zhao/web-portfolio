"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";
import SectionWrapper from "@/components/Wrapper/SectionWrapper";
import SwitchMotionButton from "@/components/MotionButton/SwitchMotionButton";
import TechSkillsPanel from "@/components/TechSkills/TechSkillsPanel";
import TechStackImageSlider from "@/components/TechStack/ImageSlider/TechStackImageSlider";
import TechStackImagePanel from "@/components/TechStack/ImagePanel/TechStackImagePanel";
import Timeline from "@/components/Timeline/Timeline";
import useWindowAttr from "@/hooks/useWindowAttr";
import TimelineMobile from "@/components/Timeline/TimelineMobile";
import AboutPanel from "@/components/About/AboutPanel";

const laptopViewWidth = 1024;
const tabletViewWidth = 768;

const page = () => {
  const [showImageSlider, setShowImageSlider] = useState(true);
  const { isInClient, windowSize } = useWindowAttr();
  const { width } = windowSize;

  const imageSwitchButtonOnClickHandler = useCallback(() => {
    setShowImageSlider((prev) => !prev);
  }, []);

  if (!isInClient) {
    return null;
  } 

  return (
    <>
      {width < laptopViewWidth ? (
        // mobile view
        <SectionWrapper
          className="relative w-full bg-neutral"
          title="SKILLS"
          titlePosition="center"
        >
          <TechStackImagePanel key="techstack-panel" numItemPerRow={4} />
        </SectionWrapper>
      ) : (
        // laptop+ view
        <SectionWrapper
          className="relative w-full h-[36rem] bg-neutral overflow-hidden"
          title="Technical Skills"
          titlePosition="left"
        >
          <AnimatePresence mode="wait">
            {showImageSlider ? (
              <TechStackImageSlider key="techstack-slider" />
            ) : (
              <TechSkillsPanel key="techskill-panel" />
            )}
          </AnimatePresence>

          <SwitchMotionButton
            className="absolute bottom-0 right-[4%]"
            clickHandler={imageSwitchButtonOnClickHandler}
          />
        </SectionWrapper>
      )}
      <SectionWrapper className="w-full" title="Experience" titlePosition={width < laptopViewWidth ? "center" : "left"}>
        {width < tabletViewWidth ? <TimelineMobile /> : <Timeline />}
      </SectionWrapper>
      <SectionWrapper className="w-full h-72 max-h-96" title="About Me" titlePosition={width < laptopViewWidth ? "center" : "left"}>
        <AboutPanel />
      </SectionWrapper>
      
    </>
  );
};

export default page;
