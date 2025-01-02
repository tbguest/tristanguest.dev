import { useRef } from "react";
import { useDrawLine } from "../../../../hooks/content/use-draw-line";
import { drawLine } from "../../../../utils/animate/draw-line";

interface Props {
  initialState: number[];
  latticeSize: number;
  opts: { yScale: number; yOrigin: number };
  canvasSize?: { width: number; height: number };
}

export function LineStatic({
  initialState,
  latticeSize,
  opts,
  canvasSize,
}: Props) {
  const screenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useDrawLine({
    screenCanvas: screenCanvasRef.current,
    initialState,
    latticeSize,
    opts,
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
