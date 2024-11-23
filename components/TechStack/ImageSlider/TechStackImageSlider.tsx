"use client";

import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import images from "../ImageData";
import ImageSliderControls from "./Controls";
import ImageSliderCore from "./Core";

const totalImages = images.length;
const rotationDeg = 360 / totalImages;

// Showcase the techstack (skills) used to build this site.
const TechStackImageSlider = () => {
  const [rotationY, setRotationY] = useState<number>(0);
  const [currentPos, setCurrentPos] = useState<number>(0);

  const leftControlClickHandler = useCallback(() => {
    setRotationY((prev) => prev + rotationDeg);
    setCurrentPos(
      (prev) => (((prev - 1) % totalImages) + totalImages) % totalImages
    );
  }, []);

  const rightControlClickHandler = useCallback(() => {
    setRotationY((prev) => prev - rotationDeg);
    setCurrentPos(
      (prev) => (((prev + 1) % totalImages) + totalImages) % totalImages
    );
  }, []);

  return (
    <motion.div
      className="w-full h-full overflow-hidden"
      exit={{ opacity: 0, y: -50, transition: { duration: 0.3 } }}
    >
      <ImageSliderCore
        className="relative w-[10rem] h-[13rem] left-[calc(50%-5rem)] top-[12%] z-10"
        focusPosition={currentPos}
        itemPositionRotation={rotationDeg}
        sliderRotation={rotationY}
      />

      <ImageSliderControls
        className="absolute left-[calc(50%-25%/2)] w-[25%] laptop:bottom-8 desktop-sm:bottom-6 desktop-lg:bottom-5"
        leftControlClickHandler={leftControlClickHandler}
        rightControlClickHandler={rightControlClickHandler}
      />
    </motion.div>
  );
};

export default TechStackImageSlider;
