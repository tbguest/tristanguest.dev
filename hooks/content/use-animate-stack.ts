import { useEffect, useLayoutEffect, useRef, useState } from "react";

export type DrawOptions = {
  yScale: number;
  yOrigin: number;
};

export function useAnimateStack({
  screenCanvas,
  bufferCanvas,
  initialState,
  iterator,
  latticeSize,
  stackOffset,
  opts,
  skip = 1,
}: {
  screenCanvas: HTMLCanvasElement | null | undefined;
  bufferCanvas?: HTMLCanvasElement | null | undefined;
  initialState: number[];
  iterator: (prevState: number[]) => { h: number[] };
  latticeSize: number;
  stackOffset: number;
  opts: DrawOptions;
  skip?: number;
}) {
  const [isCanvas, setIsCanvas] = useState(false);
  const nowRef = useRef(Date.now());
  const thenRef = useRef(Date.now());
  // const startRef = useRef(Date.now());
  const elapsedRef = useRef(0);
  const dataRef = useRef(initialState);

  const screenContext = screenCanvas?.getContext("2d");
  const bufferContext = bufferCanvas?.getContext("2d");

  const fpsInterval = 1000 / 30;
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
      if (screenCanvas && bufferCanvas && screenContext && bufferContext) {
        nowRef.current = Date.now();
        elapsedRef.current = nowRef.current - thenRef.current;

        if (elapsedRef.current > fpsInterval) {
          // Get ready for next frame by setting then=now, but...
          // Also, adjust for fpsInterval not being multiple of 16.67
          thenRef.current = nowRef.current - (elapsedRef.current % fpsInterval);

          // Draw stuff here
          screenContext.clearRect(0, 0, width, height);
          bufferCanvas && screenContext.drawImage(bufferCanvas, 0, 0);

          const path = new Path2D();
          const x0 = xScale * 0;

          // // TESTING...Report seconds since start and achieved fps.
          // const sinceStart = nowRef.current - startRef.current;
          // const currentFps =
          //   Math.round((1000 / (sinceStart / ++frameCount)) * 100) / 100;
          // console.log(currentFps);

          // Negative since the canvas (0,0) is upper left
          const h0 = -opts.yScale * dataRef.current[0] + opts.yOrigin;
          path.moveTo(x0, h0);
          for (let i = 1; i < latticeSize; i += 1) {
            const xn = xScale * i;
            const yn = -opts.yScale * dataRef.current[i] + opts.yOrigin;
            path.lineTo(xn, yn);
          }
          screenContext.lineWidth = 1;
          screenContext.stroke(path);

          // Draw the contents of the screenCanvas on the bufferCanvas, with an offset
          bufferContext.clearRect(0, 0, width, height);
          // bufferContext.drawImage(screenCanvas, 0, 0);
          bufferContext.drawImage(screenCanvas, 0, stackOffset);

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
    bufferCanvas,
    bufferContext,
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
    stackOffset,
    width,
    xScale,
  ]);
}
