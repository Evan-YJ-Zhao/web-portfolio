import Image from "next/image";
import { htmlImg } from "@/utils/images";

const ImageSlider = () => {
  return (
    <div className="banner">
      <div className="slider">
        <div className="item">
          <Image src={htmlImg} alt="Html 5 Image" />
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
