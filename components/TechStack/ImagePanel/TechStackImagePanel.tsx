import Image from "next/image";
import images, { TechStackImage } from "../ImageData";

type Props = {
  numItemPerRow: 4 | 5 | 6;
};

const TechStackImagePanel = ({ numItemPerRow }: Props) => {
  const lastRowStartIndex = images.length - (images.length % numItemPerRow);
  let gridCols = "grid-cols-4";
  let gridColsSpan = "col-span-4";
  let lastRowWidth = "w-[calc(100%-0.5rem*3)]";
  let lastRowItemWidth = "w-1/4";

  switch (numItemPerRow) {
    case 5:
      gridCols = "grid-cols-5";
      gridColsSpan = "col-span-5";
      lastRowWidth = "w-[calc(100%-0.5rem*4)]";
      lastRowItemWidth = "w-1/5";
      break;
    case 6:
      gridCols = "grid-cols-6";
      gridColsSpan = "col-span-6";
      lastRowWidth = "w-[calc(100%-0.5rem*5)]";
      lastRowItemWidth = "w-1/6";
      break;
    default:
      break;
  }

  return (
    <div className="flex justify-center">
      <div
        className={`w-full phone-lg:w-5/6 tablet:w-4/6 
          grid ${gridCols}
          gap-2 phone-lg:gap-3 tablet:gap-4
          p-2 phone-lg:p-3 tablet:p-4
          justify-items-center`}
      >
        {images.slice(0, lastRowStartIndex).map((img: TechStackImage) => (
          <div
            key={img.id}
            className="relative w-full aspect-square border-2 border-primary rounded"
          >
            <Image src={img.image} alt={img.description} fill />
          </div>
        ))}
        <div
          className={`${lastRowWidth} ${gridColsSpan} flex justify-center gap-2 phone-lg:gap-3 tablet:gap-4`}
        >
          {images.slice(lastRowStartIndex).map((img: TechStackImage) => (
            <div
              key={img.id}
              className={`relative ${lastRowItemWidth} aspect-square border-2 border-primary rounded`}
            >
              <Image src={img.image} alt={img.description} fill />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStackImagePanel;
