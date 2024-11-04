import Image from "next/image";
import images, { SliderImage } from "./ImageSliderImages";
import { OptionalClassName } from "@/utils/commonTypes";

type ImageSliderCoreProps = OptionalClassName & {
  focusPosition: number;
  itemPositionRotation: number;
  sliderRotation: number;
};

type ImageSliderCSSProperties = React.CSSProperties & {
  "--slider-rotation-degree": number;
};

type ImageSliderItemCSSProperties = React.CSSProperties & {
  "--slider-item-position-degree": number;
  "--slider-item-scale": number;
};

// The main component of the image slider.
const ImageSliderCore = ({
  className,
  focusPosition,
  sliderRotation,
  itemPositionRotation,
}: ImageSliderCoreProps) => {
  return (
    <div
      className={`${className} apply-slider-animation`}
      style={
        {
          "--slider-rotation-degree": sliderRotation,
        } as ImageSliderCSSProperties
      }
    >
      {images.map((s: SliderImage) => {
        const position = s.id;

        const style: ImageSliderItemCSSProperties = {
          "--slider-item-position-degree": position * itemPositionRotation,
          "--slider-item-scale": s.id == focusPosition ? 1.2 : 1,
        };

        return (
          <div
            data-theme="cmyk"
            key={s.id}
            className="absolute inset-0 transform-slider-item border border-primary"
            style={style}
          >
            <Image
              src={s.image}
              alt={s.description}
              fill
              priority={s.priority}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ImageSliderCore;
