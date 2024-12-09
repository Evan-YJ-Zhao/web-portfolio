import FloatingTriangleGroup from "@/components/main/FloatingTriangleGroup";
import HomeMenu from "@/components/main/HomeMenu";

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <HomeMenu className="absolute z-10 top-1/4" />
      <FloatingTriangleGroup className="w-screen h-dvh absolute top-0" />
    </div>
  );
}
