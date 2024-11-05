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
    <div className="relative w-full h-full overflow-hidden bg-neutral">
      <ImageSliderCore
        className="relative w-[10rem] h-[13rem] left-[calc(50%-5rem)] top-[8rem] z-10"
        focusPosition={currentPos}
        itemPositionRotation={rotationDeg}
        sliderRotation={rotationY}
      />

      <ImageSliderControls
        className="absolute left-[calc(50%-25%/2)] w-[25%] laptop:bottom-6 desktop-sm:bottom-4 desktop-lg:bottom-2"
        leftControlClickHandler={leftControlClickHandler}
        rightControlClickHandler={rightControlClickHandler}
      />
    </div>
  );
};

export default ImageSlider;
