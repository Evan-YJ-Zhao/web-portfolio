import { StaticImageData } from "next/image";
import {
  buildImg,
  cloudImg,
  codeBlockImg,
  databaseImg,
  frameSourceImg,
  outboxAltImg,
  queryStatsImg,
} from "@/utils/images";

type TechInfo = {
  id: number;
  name: string;
  icon: StaticImageData;
  techs: string[];
};

const techStack: ReadonlyArray<TechInfo> = Object.freeze([
  {
    id: 1,
    name: "Languages",
    icon: codeBlockImg,
    techs: ["HTML", "CSS", "Java", "JavaScript", "SQL", "TypeScript"],
  },
  {
    id: 2,
    name: "Frameworks & Library",
    icon: frameSourceImg,
    techs: [
      "Express.js",
      "Framer Motion",
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Spring Boot",
    ],
  },
  {
    id: 3,
    name: "Cloud Services",
    icon: cloudImg,
    techs: [
      "ECS",
      "AWS API Gateway",
      "S3",
      "Cloudflare",
      "Dialoglow",
      "GCP Cloud Run",
    ],
  },
  {
    id: 4,
    name: "Database",
    icon: databaseImg,
    techs: ["MongoDB", "MySQL", "Redis"],
  },
  { id: 5, name: "Messaging Queue", icon: outboxAltImg, techs: ["RabbitMQ"] },
  {
    id: 6,
    name: "Development Tools",
    icon: buildImg,
    techs: ["Git", "Perforce", "Postman"],
  },
  {
    id: 7,
    name: "Analytics Tools",
    icon: queryStatsImg,
    techs: ["Cloudwatch", "Splunk"],
  },
]);

export type { TechInfo };
export default techStack;
