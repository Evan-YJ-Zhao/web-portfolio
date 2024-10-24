import Image, { StaticImageData } from "next/image";
import { htmlImg } from "@/utils/images";

type SliderImage = {
  id: number,
  image: StaticImageData,
  description: string
}


const images: ReadonlyArray<SliderImage> = Object.freeze([
  {id: 1, image: htmlImg, description: "HTML 5 Image"},
  {id: 2, image: htmlImg, description: "HTML 5 Image"},
  {id: 3, image: htmlImg, description: "HTML 5 Image"},
  {id: 4, image: htmlImg, description: "HTML 5 Image"},
]);

const ImageSlider = () => {
  return (
    <div className="w-screen h-[38rem] relative overflow-hidden">
      {/* 4.5rem is half of w-36 */}
      <div className="absolute w-36 h-48 top-16 left-[calc(50%-4.5rem)] apply-rotation-animation">
        {images.map((s: SliderImage) => {
          return (
           
            <div key={s.id} className="absolute inset-0 translate-z-[35vw]">
              <Image src={s.image} alt={s.description} fill />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageSlider;
