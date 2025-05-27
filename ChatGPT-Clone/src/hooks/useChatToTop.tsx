// hooks/useChatToTop.ts
import { useEffect, useState } from "react";

const useChatToTop = (
  maxPadding: number = 600,
  baseHeight: number = 800
): string => {
  const [padding, setPadding] = useState(`${maxPadding}px`);

  useEffect(() => {
    const updatePadding = () => {
      const height = window.innerHeight;
      const diff = baseHeight - height;
      const calculated = Math.max(0, maxPadding - diff);
      setPadding(`${calculated}px`);
    };

    updatePadding();
    window.addEventListener("resize", updatePadding);
    return () => window.removeEventListener("resize", updatePadding);
  }, [maxPadding, baseHeight]);

  return padding;
};

export default useChatToTop;
