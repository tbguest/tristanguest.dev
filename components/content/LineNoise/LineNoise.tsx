import { makeNoise2D } from "open-simplex-noise";
import { useEffect, useRef, useState } from "react";
import { useResize } from "../../../hooks/use-resize";

const noise = makeNoise2D(Date.now());

const positions = Array.from({ length: 20 }, () => [
  1,
  Math.random() * 100 + 150,
]);

export function LineNoise() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const maxLineLength = 4000;
  const warp = 1.0;
  const stepSize = 2;
  const smoothness = 100;
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [maxWidth, maxHeight] = useResize(canvas, (width, height) => {
    if (canvas.current) {
      canvas.current.width = width;
      canvas.current.height = height;
    }
  });

  useEffect(() => {
    if (canvas.current) {
      setCtx(canvas.current.getContext("2d")!);
    }
  }, [canvas]);

  useEffect(() => {
    if (ctx) {
      ctx.font = "10px 'Overpass Mono', monospace";
      ctx.fillStyle = "#00000";
      ctx.strokeStyle = "#fb8500";
      ctx.globalAlpha = 0.1;
    }
    draw();
  }, [ctx, maxHeight, maxWidth, maxLineLength, warp, stepSize, smoothness]);

  const draw = () => {
    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, maxWidth, maxHeight);
    ctx.lineWidth = 1.0;

    for (let i = 0; i < positions.length; i++) {
      let x = positions[i][0];
      let y = positions[i][1];
      let length = 0;
      ctx.beginPath();
      ctx.moveTo(x, y);
      while (
        x > 0 &&
        y > 0 &&
        x < maxWidth &&
        y < maxHeight &&
        length < maxLineLength
      ) {
        const n = noise(x / smoothness, y / smoothness);
        x += Math.cos(n * warp) * stepSize;
        y += Math.sin(n * warp) * stepSize;
        length += stepSize;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  };

  return <canvas style={{ height: "800px", width: "100%" }} ref={canvas} />;
}
