import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { drawLine } from "../../utils/animate/draw-line";

export type DrawOptions = {
  yScale: number;
  yOrigin: number;
};

export function useAnimateLine({
  screenCanvas,
  initialState,
  iterator,
  latticeSize,
  opts,
  skip = 1,
}: {
  screenCanvas: HTMLCanvasElement | null | undefined;
  initialState: number[];
  iterator: (prevState: number[]) => { h: number[] };
  latticeSize: number;
  opts: DrawOptions;
  skip?: number;
}) {
  const [isCanvas, setIsCanvas] = useState(false);
  const nowRef = useRef(Date.now());
  const thenRef = useRef(Date.now());
  const elapsedRef = useRef(0);
  const dataRef = useRef(initialState);

  const screenContext = screenCanvas?.getContext("2d");

  const fpsInterval = 1000 / 25;
  const frameCount = 0;

  // Scale the data to the canvas
  const width = screenCanvas?.width || 1;
  const height = screenCanvas?.height || 1;
  const xScale = width ? width / initialState.length : 1;

  dataRef.current = initialState;

  // So it runs whenever the page remounts
  useEffect(() => {
    if (!isCanvas) {
      setIsCanvas(true);
    }
  }, [isCanvas]);

  // Layout effect runs the cleanup function synchronously so we don't strand any active frames
  useLayoutEffect(() => {
    let timerId: number;

    const render = () => {
      if (screenCanvas && screenContext) {
        nowRef.current = Date.now();
        elapsedRef.current = nowRef.current - thenRef.current;

        if (elapsedRef.current > fpsInterval) {
          // Get ready for next frame by setting then=now, but...
          // Also, adjust for fpsInterval not being multiple of 16.67
          thenRef.current = nowRef.current - (elapsedRef.current % fpsInterval);

          drawLine({
            context: screenContext,
            data: dataRef.current,
            width,
            height,
            xScale,
            latticeSize,
            opts,
          });

          // Use `skip` to draw every N frames
          for (let i = 0; i < skip; i++) {
            const { h } = iterator(initialState);
            dataRef.current = h;
          }
        }
      }
      timerId = requestAnimationFrame(render);
    };
    timerId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(timerId);
  }, [
    screenCanvas,
    screenContext,
    isCanvas,
    fpsInterval,
    frameCount,
    initialState,
    iterator,
    height,
    opts,
    latticeSize,
    skip,
    width,
    xScale,
  ]);
}
