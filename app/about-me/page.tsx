"use client";

import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import ImageSlider from "@/components/ImageSlider/ImageSlider";
import TechStackPanel from "@/components/TechStackPanel/TechStackPanel";
import { switchImg } from "@/utils/images";

const page = () => {
  const [showImageSlider, setShowImageSlider] = useState(true);

  const imageSwitchButtonOnClickHandler = () => {
    setShowImageSlider((prev) => !prev);
  };

  return (
    <div>
      <div className="relative w-screen h-[38rem] bg-neutral">
        <AnimatePresence mode="wait">
          {showImageSlider ? <ImageSlider key="image-slider"/> : <TechStackPanel key="techstack-panel"/>}
        </AnimatePresence>
        <div className="absolute bottom-0 right-0">
          <button
            className="w-10 h-10 m-4"
            onClick={imageSwitchButtonOnClickHandler}
          >
            <Image
              src={switchImg}
              alt="A toggle for switching between the slider and the grid view"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
