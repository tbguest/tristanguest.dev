import { useRef } from "react";
import { useAnimateLine } from "../../../../hooks/content/use-animate-line";

interface Props {
  initialState: number[];
  iterator: (state: number[]) => { h: number[] };
  latticeSize: number;
  opts: { yScale: number; yOrigin: number };
  skip?: number;
  canvasSize?: { width: number; height: number };
}

export function LineAnimation({
  initialState,
  iterator,
  latticeSize,
  opts,
  skip = 1,
  canvasSize,
}: Props) {
  const screenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useAnimateLine({
    screenCanvas: screenCanvasRef.current,
    initialState,
    iterator,
    latticeSize,
    opts,
    skip,
  });

  const canvasProps = canvasSize ?? {
    width: 600,
    height: 400,
  };

  return (
    <div className="flex relative items-center justify-center px-5 md:px-20 py-5">
      <canvas
        {...canvasProps}
        className="flex flex-1 max-w-full"
        ref={screenCanvasRef}
      />
    </div>
  );
}
