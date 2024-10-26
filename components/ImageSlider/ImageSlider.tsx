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
  { id: 10, image: htmlImg, description: "HTML 5 Image" },
  { id: 11, image: htmlImg, description: "HTML 5 Image" },
]);

const ImageSlider = () => {
  return (
    <div className="w-screen h-[38rem] relative overflow-hidden">
      {/* 5rem is half of w-40 */}
      <div className="absolute w-40 h-52 top-[8rem] left-[calc(50%-5rem)] z-10 apply-rotation-animation">
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
      <div className="flex h-full justify-center items-center mt-[-2rem]">
        <h1 className="text-center text-9xl antialiased font-bold text-white text-stroke-4 text-stroke-color-black">
          SKILLS
        </h1>
      </div>
    </div>
  );
};

export default ImageSlider;
