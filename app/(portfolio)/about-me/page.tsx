"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";
import AboutPanel from "@/components/AboutMe/AboutPanel";
import SectionWrapper from "@/components/Wrappers/SectionWrapper";
import SwitchMotionButton from "@/components/AboutMe/SwitchMotionButton";
import TechSkillsPanel from "@/components/AboutMe/TechSkills/TechSkillsPanel";
import TechStackImagePanel from "@/components/AboutMe/TechStack/ImagePanel/TechStackImagePanel";
import TechStackImageSlider from "@/components/AboutMe/TechStack/ImageSlider/TechStackImageSlider";
import Timeline from "@/components/AboutMe/Timeline/Timeline";
import TimelineMobile from "@/components/AboutMe/Timeline/TimelineMobile";
import useWindowAttr from "@/hooks/useWindowAttr";

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

          <div className="absolute bottom-0 right-[4%]">
            <SwitchMotionButton
              className="w-10 h-10 m-4"
              onClickHandler={imageSwitchButtonOnClickHandler}
            />
          </div>
        </SectionWrapper>
      )}
      <SectionWrapper
        className="w-full"
        title="Experience"
        titlePosition={width < laptopViewWidth ? "center" : "left"}
      >
        {width < tabletViewWidth ? <TimelineMobile /> : <Timeline />}
      </SectionWrapper>
      <SectionWrapper
        className="w-full min-h-80 "
        title="About Me"
        titlePosition={width < laptopViewWidth ? "center" : "left"}
      >
        <AboutPanel />
      </SectionWrapper>
    </>
  );
};

export default page;
