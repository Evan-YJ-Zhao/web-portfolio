'use client'

import Image from "next/image";
import { useState } from "react";
import ImageSlider from "@/components/ImageSlider/ImageSlider";
import TechStackPanel from "@/components/TechStackPanel/TechStackPanel";
import { switchImg } from "@/utils/images";


const page = () => {

  const [showImageSlider, setShowImageSlider] = useState(true);

  const imageSwitchButtonOnClickHandler = () => {
    setShowImageSlider(prev => !prev);
  }

  return (
    <div>
      <div className="relative w-screen h-[38rem]">
        {showImageSlider ? <ImageSlider /> : <TechStackPanel />}
        <div className="absolute bottom-0 w-full flex flex-row-reverse">
          <button className="w-10 h-10 m-2" onClick={imageSwitchButtonOnClickHandler}>
            <Image src={switchImg} alt="A toggle for switching between the slider and the grid view"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
