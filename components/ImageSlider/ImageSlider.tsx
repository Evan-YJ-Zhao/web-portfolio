"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { htmlImg, cssImg } from "@/utils/images";

type SliderImage = {
  id: number;
  image: StaticImageData;
  description: string;
};

type ImageSliderCSSProperties = React.CSSProperties & {
  "--slider-rotation-degree": number;
};

type ImageSliderItemCSSProperties = React.CSSProperties & {
  "--slider-item-position-degree": number;
  "--slider-item-scale": number;
};

const images: ReadonlyArray<SliderImage> = Object.freeze([
  { id: 0, image: htmlImg, description: "HTML 5 Image" },
  { id: 1, image: cssImg, description: "CSS 3 Image" },
  { id: 2, image: htmlImg, description: "HTML 5 Image" },
  { id: 3, image: htmlImg, description: "HTML 5 Image" },
  { id: 4, image: htmlImg, description: "HTML 5 Image" },
  { id: 5, image: htmlImg, description: "HTML 5 Image" },
  { id: 6, image: htmlImg, description: "HTML 5 Image" },
  { id: 7, image: htmlImg, description: "HTML 5 Image" },
  { id: 8, image: htmlImg, description: "HTML 5 Image" },
  { id: 9, image: htmlImg, description: "HTML 5 Image" },
  { id: 10, image: htmlImg, description: "HTML 5 Image" },
  { id: 11, image: htmlImg, description: "HTML 5 Image" },
]);

const totalImages = images.length;
const rotationDeg = 360 / totalImages;

const ImageSlider = () => {
  const [rotationY, setRotationY] = useState(0);
  const [currentPos, setCurrentPos] = useState(0);

  const leftControllerClick = () => {
    setRotationY((prev) => prev + rotationDeg);
    setCurrentPos(prev => ((prev - 1) % totalImages + totalImages) % totalImages);
  };

  const rightControllerClick = () => {
    setRotationY((prev) => prev - rotationDeg);
    setCurrentPos(prev => ((prev + 1) % totalImages + totalImages) % totalImages);

  }

  return (
    <div
      className="w-screen h-[40rem] relative overflow-hidden"
    >
      <div
        className={`absolute w-[10rem] h-52 top-[8rem] left-[calc(50%-5rem)] z-10 apply-slider-animation`}
        style={
          {
            "--slider-rotation-degree": rotationY,
          } as ImageSliderCSSProperties
        }
      >
        {images.map((s: SliderImage) => {
          const position = s.id;

          const style: ImageSliderItemCSSProperties = {
            "--slider-item-position-degree": position * rotationDeg,
            "--slider-item-scale": s.id == currentPos ? 1.2 : 1 
          };

          return (
            <div
              key={s.id}
              className="absolute inset-0 transform-slider-item"
              style={style}
            >
              <Image src={s.image} alt={s.description} fill />
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-2 left-[calc(50%-25%/2)] w-[25%] flex justify-between items-center">
        <button className="btn btn-circle" onClick={leftControllerClick}>&#x276E;</button>
        <button className="btn btn-circle" onClick={rightControllerClick}>&#x276F;</button>
      </div>

      <div className="flex h-full justify-center items-center mt-[-5rem]">
        <h1 className="text-center text-9xl antialiased font-bold text-white text-stroke-4 text-stroke-color-black">
          SKILLS
        </h1>
      </div>
    </div>
  );
};

export default ImageSlider;
