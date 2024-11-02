"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import {
  awsImg,
  cloudflareImg,
  dockerImg,
  githubImg,
  mongoDBImg,
  nextJsImg,
  nodeJsImg,
  postmanImg,
  tailwindCSSImg,
  typeScriptImg,
} from "@/utils/images";

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
  { id: 0, image: awsImg, description: "An image of AWS" },
  { id: 1, image: cloudflareImg, description: "An image of Cloudflare" },
  { id: 2, image: dockerImg, description: "An image of Docker" },
  { id: 3, image: githubImg, description: "An image of Github" },
  { id: 4, image: mongoDBImg, description: "An image of MongoDB" },
  { id: 5, image: nextJsImg, description: "An Image of Next.Js" },
  { id: 6, image: nodeJsImg, description: "An Image of Node.Js" },
  { id: 7, image: postmanImg, description: "An Image of Postman" },
  { id: 8, image: tailwindCSSImg, description: "An Image of Tailwind CSS" },
  { id: 9, image: typeScriptImg, description: "An Image of TypeScript" },
]);

const totalImages = images.length;
const rotationDeg = 360 / totalImages;

const ImageSlider = () => {
  const [rotationY, setRotationY] = useState(0);
  const [currentPos, setCurrentPos] = useState(0);

  const leftControllerClick = () => {
    setRotationY((prev) => prev + rotationDeg);
    setCurrentPos(
      (prev) => (((prev - 1) % totalImages) + totalImages) % totalImages
    );
  };

  const rightControllerClick = () => {
    setRotationY((prev) => prev - rotationDeg);
    setCurrentPos(
      (prev) => (((prev + 1) % totalImages) + totalImages) % totalImages
    );
  };

  return (
    <div className="w-screen h-[38rem] relative overflow-hidden">
      <div
        className={`absolute w-[10rem] h-[13rem] left-[calc(50%-5rem)] top-[8rem] z-10 apply-slider-animation`}
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
            "--slider-item-scale": s.id == currentPos ? 1.2 : 1,
          };

          return (
            <div
              data-theme="cmyk"
              key={s.id}
              className="absolute inset-0 transform-slider-item border border-neutral"
              style={style}
            >
              <Image
                src={s.image}
                alt={s.description}
                fill
                priority={s.id == 0 ? true : false}
              />
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-2 left-[calc(50%-25%/2)] w-[25%] flex justify-between items-center">
        <button
          data-theme="cmyk"
          className="btn btn-circle hover:bg-primary border border-neutral"
          onClick={leftControllerClick}
        >
          &#x276E;
        </button>
        <button
          data-theme="cmyk"
          className="btn btn-circle hover:bg-primary border border-neutral"
          onClick={rightControllerClick}
        >
          &#x276F;
        </button>
      </div>

      {/* <div className="flex h-full justify-center items-center mt-[-5rem]">
        <h1 className="text-center text-9xl antialiased font-bold text-white text-stroke-4 text-stroke-color-black">
          SKILLS
        </h1>
      </div> */}
    </div>
  );
};

export default ImageSlider;
