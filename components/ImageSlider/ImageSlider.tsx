import Image from "next/image";
import { htmlImg } from "@/utils/images";

const ImageSlider = () => {
  return (
    <div className="w-screen h-[38rem] relative overflow-hidden">
      {/* 4.5rem is half of w-36 */}
      <div className="absolute top-10 left-[calc(50%-4.5rem)] perspective-slider">
        <div className="w-36 h-48 absolute apply-slider-animation">
          <Image src={htmlImg} alt="Html 5 Image" fill />
        </div>
        {/* <div className="w-36 h-48 absolute">
          <Image src={htmlImg} alt="Html 5 Image" fill />
        </div>
        <div className="w-36 h-48 absolute">
          <Image src={htmlImg} alt="Html 5 Image" fill />
        </div>
        <div className="w-36 h-48 absolute">
          <Image src={htmlImg} alt="Html 5 Image" fill />
        </div> */}
      </div>
    </div>
  );
};

export default ImageSlider;
