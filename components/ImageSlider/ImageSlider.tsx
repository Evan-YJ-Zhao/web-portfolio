"use client";

import { useCallback, useState } from "react";

import images from "./ImageSliderImages";
import ImageSliderControls from "./ImageSliderControls";
import ImageSliderCore from "./ImageSliderCore";

const totalImages = images.length;
const rotationDeg = 360 / totalImages;

const ImageSlider = () => {
  const [rotationY, setRotationY] = useState(0);
  const [currentPos, setCurrentPos] = useState(0);

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
    <div className="w-screen h-[38rem] relative overflow-hidden">
      <ImageSliderCore
        className="absolute w-[10rem] h-[13rem] left-[calc(50%-5rem)] top-[8rem] z-10"
        focusPosition={currentPos}
        itemPositionRotation={rotationDeg}
        sliderRotation={rotationY}
      />

      <ImageSliderControls
        className="absolute bottom-2 left-[calc(50%-25%/2)] w-[25%]"
        leftControlClickHandler={leftControlClickHandler}
        rightControlClickHandler={rightControlClickHandler}
      />

      {/* <div className="flex h-full justify-center items-center mt-[-5rem]">
        <h1 className="text-center text-9xl antialiased font-bold text-white text-stroke-4 text-stroke-color-black">
          SKILLS
        </h1>
      </div> */}
    </div>
  );
};

export default ImageSlider;
