import { useState, useEffect } from "react";

type WindowSize = {
  width: number;
  height: number;
};

type WindowAttr = {
  isInClient: boolean;
  windowSize: WindowSize;
};

function useWindowAttr(): WindowAttr {
  const [isInClient, setIsInClient] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    setIsInClient(true);
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isInClient, windowSize };
}

export type { WindowAttr };
export default useWindowAttr;
