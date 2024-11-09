import { StaticImageData } from "next/image";
import {
  awsImg,
  cloudflareImg,
  dockerImg,
  framerMotionImg,
  githubImg,
  mongoDBImg,
  nextJsImg,
  nodeJsImg,
  postmanImg,
  tailwindCSSImg,
  typeScriptImg,
} from "@/utils/images";

type SliderImage = {
  id: number;
  image: StaticImageData;
  description: string;
  priority: boolean;
};

const images: ReadonlyArray<SliderImage> = Object.freeze([
  { id: 0, image: awsImg, description: "An image of AWS", priority: true },
  {
    id: 1,
    image: cloudflareImg,
    description: "An image of Cloudflare",
    priority: true,
  },
  {
    id: 2,
    image: dockerImg,
    description: "An image of Docker",
    priority: false,
  },
  {
    id: 3,
    image: framerMotionImg,
    description: "An image of Framer Motion",
    priority: false,
  },
  {
    id: 4,
    image: githubImg,
    description: "An image of Github",
    priority: false,
  },
  {
    id: 5,
    image: mongoDBImg,
    description: "An image of MongoDB",
    priority: false,
  },
  {
    id: 6,
    image: nextJsImg,
    description: "An Image of Next.Js",
    priority: false,
  },
  {
    id: 7,
    image: nodeJsImg,
    description: "An Image of Node.Js",
    priority: false,
  },
  {
    id: 8,
    image: postmanImg,
    description: "An Image of Postman",
    priority: false,
  },
  {
    id: 9,
    image: tailwindCSSImg,
    description: "An Image of Tailwind CSS",
    priority: false,
  },
  {
    id: 10,
    image: typeScriptImg,
    description: "An Image of TypeScript",
    priority: true,
  },
]);

export type { SliderImage };
export default images;
