import HomeMenu from "@/components/Menu/HomeMenu";
import dynamic from "next/dynamic";

const FloatingTriangleGroup = dynamic(
  () => import("@/components/FloatingTriangle/FloatingTriangleGroup"),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="flex justify-center items-center">
      <HomeMenu className="absolute z-10 top-1/4" />
      <FloatingTriangleGroup className="w-screen h-dvh absolute top-0" />
    </div>
  );
}
