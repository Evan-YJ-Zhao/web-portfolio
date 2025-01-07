import FloatingTriangleGroup from "@/components/Home/FloatingTriangleGroup";
import HomeMenu from "@/components/Home/HomeMenu";

export default function HomePage() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <HomeMenu className="absolute z-10 top-1/4" />
      <FloatingTriangleGroup className="w-screen h-dvh absolute top-0" />
    </div>
  );
}
