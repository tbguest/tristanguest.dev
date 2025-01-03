import { DrawOptions } from "../../hooks/content/use-animate-line";

export function drawLine({
  context,
  bufferCanvas,
  data,
  width,
  height,
  xScale,
  latticeSize,
  opts,
}: {
  context: CanvasRenderingContext2D;
  bufferCanvas?: HTMLCanvasElement | null;
  data: number[];
  width: number;
  height: number;
  xScale: number;
  latticeSize: number;
  opts: DrawOptions;
}) {
  // Draw stuff here
  context.clearRect(0, 0, width, height);
  bufferCanvas && context.drawImage(bufferCanvas, 0, 0);

  const path = new Path2D();
  const x0 = xScale * 0;

  // Negative since the canvas (0,0) is upper left
  const h0 = -opts.yScale * data[0] + opts.yOrigin;
  path.moveTo(x0, h0);
  for (let i = 1; i < latticeSize; i += 1) {
    const xn = xScale * i;
    const yn = -opts.yScale * data[i] + opts.yOrigin;
    path.lineTo(xn, yn);
  }
  context.lineWidth = 1;
  context.stroke(path);
}
