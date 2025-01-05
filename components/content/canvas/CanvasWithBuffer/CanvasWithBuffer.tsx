import { PropsWithChildren } from "react";

interface Props {
  screenCanvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  bufferCanvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
}

export function CanvasWithBuffer({
  screenCanvasRef,
  bufferCanvasRef,
}: PropsWithChildren & Props) {
  const canvasProps = {
    width: 600,
    height: 300,
  };

  return (
    <div className="flex relative items-center justify-center px-5 md:px-20 py-5">
      <canvas
        {...canvasProps}
        ref={bufferCanvasRef}
        style={{ display: "none" }}
      />
      <canvas
        {...canvasProps}
        className="flex flex-1 max-w-full"
        ref={screenCanvasRef}
      />
    </div>
  );
}
