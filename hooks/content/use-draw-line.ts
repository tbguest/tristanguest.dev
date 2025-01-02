import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { drawLine } from "../../utils/animate/draw-line";

export type DrawOptions = {
  yScale: number;
  yOrigin: number;
};

/**
 * Draw a single profile on canvas. No animation.
 */
export function useDrawLine({
  screenCanvas,
  initialState,
  latticeSize,
  opts,
}: {
  screenCanvas: HTMLCanvasElement | null | undefined;
  initialState: number[];
  latticeSize: number;
  opts: DrawOptions;
}) {
  const [isCanvas, setIsCanvas] = useState(false);
  const dataRef = useRef(initialState);
  const screenContext = screenCanvas?.getContext("2d");

  // Scale the data to the canvas
  const width = screenCanvas?.width || 1;
  const height = screenCanvas?.height || 1;
  const xScale = width ? width / initialState.length : 1;

  dataRef.current = { ...initialState };

  // So it runs whenever the page remounts
  useEffect(() => {
    if (!isCanvas) {
      setIsCanvas(true);
    }
  }, [isCanvas]);

  useEffect(() => {
    if (screenCanvas && screenContext) {
      drawLine({
        context: screenContext,
        data: dataRef.current,
        width,
        height,
        xScale,
        latticeSize,
        opts,
      });
    }
  }, [
    screenCanvas,
    screenContext,
    isCanvas,
    initialState,
    height,
    opts,
    latticeSize,
    width,
    xScale,
  ]);
}
