"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ImageSlider from "@/components/ImageSlider/ImageSlider";
import SectionWrapper from "@/components/Wrapper/SectionWrapper";
import TechStackPanel from "@/components/TechStackPanel/TechStackPanel";
import useWindowAttr from "@/hooks/useWindowAttr";

const page = () => {
  const [showImageSlider, setShowImageSlider] = useState(true);
  const { isInClient, windowSize } = useWindowAttr();
  const { width } = windowSize;

  if(!isInClient){
    return null;
  }else if(width < 1024){
    // mobile view
    return (
      <>
        <SectionWrapper className="relative w-screen bg-neutral" title="Technical Skills">
          <div></div>
        </SectionWrapper>
      </>
    );
  }

  const imageSwitchButtonOnClickHandler = () => {
    setShowImageSlider((prev) => !prev);
  };

  return (
    <>
      <SectionWrapper
        className="relative w-screen h-[36rem] bg-neutral overflow-hidden"
        title="Technical Skills"
      >
        <AnimatePresence mode="wait">
          {showImageSlider ? (
            <ImageSlider key="image-slider" />
          ) : (
            <TechStackPanel key="techstack-panel" />
          )}
        </AnimatePresence>

        <div className="absolute bottom-0 right-[2%]">
          <motion.button
            className="w-10 h-10 m-4"
            onClick={imageSwitchButtonOnClickHandler}
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
        </div>
      </SectionWrapper>
    </>
  );
};

export default page;
