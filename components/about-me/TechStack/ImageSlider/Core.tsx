import Image from "next/image";
import images, { TechStackImage } from "../ImageData";
import { OptionalClassName } from "@/utils/types";

type Props = OptionalClassName & {
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
const Core = ({
  className = "",
  focusPosition,
  sliderRotation,
  itemPositionRotation,
}: Props) => {
  return (
    <div
      className={`apply-slider-animation ${className}`}
      style={
        {
          "--slider-rotation-degree": sliderRotation,
        } as ImageSliderCSSProperties
      }
    >
      {images.map((img: TechStackImage) => {
        const position = img.id;

        const style: ImageSliderItemCSSProperties = {
          "--slider-item-position-degree": position * itemPositionRotation,
          "--slider-item-scale": img.id == focusPosition ? 1.2 : 1,
        };

        return (
          <div
            data-theme="cmyk"
            key={img.id}
            className="absolute inset-0 transform-slider-item border border-primary"
            style={style}
          >
            <Image
              src={img.image}
              alt={img.description}
              fill
              priority={img.priority}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Core;
