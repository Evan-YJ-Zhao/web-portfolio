'use client'

import { getRandomIntByRange, rangeInclusive } from "@/utils";

type FloatingTriangleCSSProperties = React.CSSProperties & {
  "--angle-start": string;
  "--angle-end": string;
  "--border-radius": string;
  "--bottom": string;
  "--floating-duration": string;
  "--left": string;
  "--size": string;
};

type FloatingTriangleGroupProps = {
  triangleNums: number;
};

export default function FloatingTriangleGroup({
  triangleNums,
}: FloatingTriangleGroupProps) {
  const range = Math.floor(100 / triangleNums);
  console.log(window.innerWidth);
  return (
    <div>
      {rangeInclusive(0, triangleNums - 1).map((i: number) => {
        const key = `tri-${i}`;
        const start = range * i;
        const end = start + range - 1;
        const style: FloatingTriangleCSSProperties = {
          "--angle-start": `${getRandomIntByRange(-30, 30)}deg`,
          "--angle-end": `${getRandomIntByRange(90, 140)}deg`,
          "--left": `${getRandomIntByRange(start, end)}%`,
          "--bottom": `${getRandomIntByRange(-25, -10)}rem`,
          "--size": `${getRandomIntByRange(2, 12)}rem`,
          "--border-radius": `${getRandomIntByRange(5, 30)}%`,
          "--floating-duration": `${getRandomIntByRange(5, 10)}s`,
        };

        return <span key={key} className="floating-triangle" style={style}></span>;
      })}
    </div>
  );
}
