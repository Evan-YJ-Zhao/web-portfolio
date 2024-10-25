import Image, { StaticImageData } from "next/image";
import { htmlImg } from "@/utils/images";

type SliderImage = {
  id: number;
  image: StaticImageData;
  description: string;
};

type ImageSliderCSSProperties = React.CSSProperties & {
  "--degree": number;
};

const images: ReadonlyArray<SliderImage> = Object.freeze([
  { id: 0, image: htmlImg, description: "HTML 5 Image" },
  { id: 1, image: htmlImg, description: "HTML 5 Image" },
  { id: 2, image: htmlImg, description: "HTML 5 Image" },
  { id: 3, image: htmlImg, description: "HTML 5 Image" },
  { id: 4, image: htmlImg, description: "HTML 5 Image" },
  { id: 5, image: htmlImg, description: "HTML 5 Image" },
  { id: 6, image: htmlImg, description: "HTML 5 Image" },
  { id: 7, image: htmlImg, description: "HTML 5 Image" },
  { id: 8, image: htmlImg, description: "HTML 5 Image" },
  { id: 9, image: htmlImg, description: "HTML 5 Image" },
]);

const ImageSlider = () => {
  return (
    <div className="w-screen h-[38rem] relative overflow-hidden">
      {/* 4.5rem is half of w-36 */}
      <div className="absolute w-36 h-48 top-[6rem] left-[calc(50%-4.5rem)] apply-rotation-animation">
        {images.map((s: SliderImage) => {
          const position = s.id;
          const totalImages = images.length;
          const style: ImageSliderCSSProperties = {
            "--degree": position * (360 / totalImages),
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
    </div>
  );
};

export default ImageSlider;
