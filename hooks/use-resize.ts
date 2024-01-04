import { RefObject, useEffect, useState } from "react";

export const useResize = (
  canvasRef: RefObject<HTMLCanvasElement>,
  onResize: (width: number, height: number) => void
) => {
  const [maxHeight, setMaxHeight] = useState(0);
  const [maxWidth, setMaxWidth] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const observer = new ResizeObserver(() => {
      if (!canvasRef?.current) {
        return;
      }
      const { width, height } = canvasRef.current.getBoundingClientRect();
      setMaxWidth(width);
      setMaxHeight(height);
      onResize(width, height);
    });

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => {
      if (canvas) {
        observer.unobserve(canvas);
      }
    };
  }, [canvasRef]);

  return [maxWidth, maxHeight];
};
