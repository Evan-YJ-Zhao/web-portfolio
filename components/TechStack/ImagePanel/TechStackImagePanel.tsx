import Image from "next/image";
import images, { TechStackImage } from "../ImageData";

const TechStackImagePanel = () => {
  return (
    <div className="relative w-full grid grid-cols-3 gap-2 justify-items-center p-2">
      {images.map((img: TechStackImage) => (
        <div key={img.id} className="relative w-full aspect-square border-2 border-primary rounded">
          <Image src={img.image} alt={img.description} fill />
        </div>
      ))}
    </div>
  );
};

export default TechStackImagePanel;
