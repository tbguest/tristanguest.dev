import { useRef } from "react";
import { useAnimateStack } from "../../../../hooks/content/use-animate-stack";
import { CanvasWithBuffer } from "../CanvasWithBuffer/CanvasWithBuffer";

interface Props {
  initialState: number[];
  iterator: (state: number[]) => { h: number[] };
  latticeSize: number;
  stackOffset: number;
  skip?: number;
  opts: { yScale: number; yOrigin: number };
}

export function StackAnimation({
  initialState,
  iterator,
  latticeSize,
  stackOffset,
  skip = 1,
  opts,
}: Props) {
  const screenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const bufferCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useAnimateStack({
    screenCanvas: screenCanvasRef.current,
    bufferCanvas: bufferCanvasRef.current,
    initialState,
    iterator,
    latticeSize,
    stackOffset,
    skip,
    opts,
  });
  return (
    <CanvasWithBuffer
      screenCanvasRef={screenCanvasRef}
      bufferCanvasRef={bufferCanvasRef}
    />
  );
}
