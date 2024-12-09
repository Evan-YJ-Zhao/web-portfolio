"use client";

import useWindowAttr from "@/hooks/useWindowAttr";
import { OptionalClassName } from "@/utils/types";
import { getRandomIntByRange, rangeInclusive } from "@/utils/numbers";

type FloatingTriangleCSSProperties = React.CSSProperties & {
  "--angle-start": string;
  "--angle-end": string;
  "--border-radius": string;
  "--bottom": string;
  "--delay-by-second": string;
  "--floating-duration": string;
  "--left": string;
  "--size": string;
  "--translate-by-dvh": string;
};

const FloatingTriangleGroup = ({ className = "" }: OptionalClassName) => {
  const { isInClient, windowSize } = useWindowAttr();
  const { width } = windowSize;

  if (!isInClient) {
    return null;
  }

  const triangleNums = Math.floor(width / 100);
  const range = triangleNums != 0 ? Math.ceil(100 / triangleNums) : 0;

  return (
    <div className={`${className} overflow-hidden`}>
      {/* if trianglenNums - 1 < 0, this will return an empty list */}
      {rangeInclusive(0, triangleNums - 1).map((i: number) => {
        const key = `tri-${i}`;
        const start = range * i;
        const end = start + range - 1;
        const style: FloatingTriangleCSSProperties = {
          "--angle-start": `${getRandomIntByRange(-30, 30)}deg`,
          "--angle-end": `${getRandomIntByRange(90, 140)}deg`,
          "--left": `${getRandomIntByRange(start, end)}%`,
          "--bottom": `${i == 0 ? -10 : getRandomIntByRange(-25, -10)}rem`,
          "--delay-by-second": `${i == 0 ? 0 : getRandomIntByRange(0, 20)}s`,
          "--size": `${getRandomIntByRange(2, 8)}rem`,
          "--border-radius": `${getRandomIntByRange(5, 30)}%`,
          "--floating-duration": `${getRandomIntByRange(10, 20)}s`,
          "--translate-by-dvh": `${getRandomIntByRange(-230, -125)}dvh`,
        };

        return (
          <span key={key} className="floating-triangle" style={style}></span>
        );
      })}
    </div>
  );
};

export default FloatingTriangleGroup;
