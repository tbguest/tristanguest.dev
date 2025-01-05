import { useEffect, useState } from "react";
import windJsonData from "../../public/assets/content/tile.json";
import {
  WindData,
  drawScreen,
  getColorRamp,
  resize,
  setParticles,
  setWind,
  updateParticles,
} from "../../utils/animate/particles";
import { drawFrag } from "../../utils/animate/shaders/draw.frag";
import { drawVert } from "../../utils/animate/shaders/draw.vert";
import { quadVert } from "../../utils/animate/shaders/quad.vert";
import { screenFrag } from "../../utils/animate/shaders/screen.frag";
import { updateFrag } from "../../utils/animate/shaders/update.frag";
import {
  bindTexture,
  createBuffer,
  createProgram,
  createTexture,
} from "../../utils/animate/util";
import { munk } from "../../utils/models/gulf-stream/munk";
import { stommel, stommelBeta } from "../../utils/models/gulf-stream/stommel";
import { useIsomorphicLayoutEffect } from "../use-isomorphic-layout-effect";
import { dataToUint8 } from "../../utils/models/gulf-stream/data-to-uint8";

const defaultRampColors = {
  0.0: "#3288bd",
  0.1: "#66c2a5",
  0.2: "#abdda4",
  0.3: "#e6f598",
  0.4: "#fee08b",
  0.5: "#fdae61",
  0.6: "#f46d43",
  1.0: "#d53e4f",
};

export const meta = () => {
  return [
    { title: "Instability I/O" },
    {
      name: "Instability I/O",
      content: "Exploring simple physical models with JavaScript",
    },
  ];
};

export type GyreModel =
  | "gulfStream"
  | "stommel"
  | "stommelBeta"
  | "munk"
  | "moore";

// TODO: better to pass in the data?
export const useParticleAnimation = (
  model: GyreModel,
  canvas: HTMLCanvasElement | null
) => {
  const [windData, setWindData] = useState<WindData | null>(null);
  //   const screenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const screenContext = canvas?.getContext("webgl");

  // TODO: phase out the json file?
  useEffect(() => {
    const loadImageOnPageLoad = async () => {
      try {
        if (model === "gulfStream") {
          const response = await fetch(
            "/assets/content/north-atlantic-cropped.png"
          );
          const blob = await response.blob();

          const img = new Image();
          img.onload = () => {
            setWindData({ ...windJsonData, image: img });
          };
          img.src = URL.createObjectURL(blob);
        } else {
          let rawData: { u: number[][]; v: number[][]; max: number } | null =
            null;
          if (model === "stommel") {
            rawData = stommel();
            rawData.max = 5;
          }
          if (model === "stommelBeta") {
            rawData = stommelBeta();
          }
          if (model === "munk") {
            rawData = munk();
          }
          if (rawData) {
            const img = dataToUint8(rawData);
            setWindData({ ...windJsonData, image: img });
          }
        }
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    loadImageOnPageLoad();
  }, [model, canvas]);

  useIsomorphicLayoutEffect(() => {
    let timerId: number;

    if (screenContext && windData) {
      const windTexture = setWind(screenContext, windData);

      const fadeOpacity = 0.996; // how fast the particle trails fade on each frame
      const speedFactor = 5.25; // how fast the particles move
      const dropRate = 0.01; // how often the particles move to a random place
      const dropRateBump = 0.0; // drop rate increase relative to individual particle speed
      const numParticles = 128 * 128;

      const drawProgram = createProgram(screenContext, drawVert, drawFrag);
      const screenProgram = createProgram(screenContext, quadVert, screenFrag);
      const updateProgram = createProgram(screenContext, quadVert, updateFrag);

      const quadBuffer = createBuffer(
        screenContext,
        new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1])
      );
      const framebuffer = screenContext?.createFramebuffer();

      const {
        backgroundTexture: resizedBackgroundTexture,
        screenTexture: resizedScreenTexture,
      } = resize(screenContext);

      let particleStateTexture0: WebGLTexture | null;
      let particleStateTexture1: WebGLTexture | null;

      // TODO: load the setParticle outputs from localstorage if they exist
      // Deserialize the data
      const {
        particleStateResolution,
        squareNumParticles,
        particleStateTexture0: particleStateTex0,
        particleStateTexture1: particleStateTex1,
        particleIndexBuffer,
      } = setParticles(screenContext, numParticles);

      particleStateTexture0 = particleStateTex0;
      particleStateTexture1 = particleStateTex1;

      const colorRampTexture = createTexture(
        screenContext,
        screenContext.LINEAR,
        getColorRamp(defaultRampColors),
        16,
        16
      );

      let backgroundTexture: WebGLTexture | null = resizedBackgroundTexture;
      let screenTexture: WebGLTexture | null = resizedScreenTexture;

      const draw = () => {
        screenContext.disable(screenContext.DEPTH_TEST);
        screenContext.disable(screenContext.STENCIL_TEST);

        bindTexture(screenContext, windTexture, 0);
        bindTexture(screenContext, particleStateTexture0, 1);

        const {
          backgroundTexture: updatedBackgroundTexture,
          screenTexture: updatedScreenTexture,
        } = drawScreen(
          screenContext,
          framebuffer,
          screenTexture,
          backgroundTexture,
          fadeOpacity,
          quadBuffer,
          screenProgram,
          drawProgram,
          squareNumParticles,
          particleIndexBuffer,
          particleStateResolution,
          windData,
          colorRampTexture
        );

        backgroundTexture = updatedBackgroundTexture;
        screenTexture = updatedScreenTexture;

        const {
          particleStateTexture0: updatedParticleStateTexture0,
          particleStateTexture1: updatedParticleStateTexture1,
        } = updateParticles(
          screenContext,
          framebuffer,
          particleStateTexture0,
          particleStateTexture1,
          particleStateResolution,
          updateProgram,
          quadBuffer,
          windData,
          speedFactor,
          dropRate,
          dropRateBump
        );

        particleStateTexture0 = updatedParticleStateTexture0;
        particleStateTexture1 = updatedParticleStateTexture1;

        timerId = requestAnimationFrame(draw);
      };

      timerId = requestAnimationFrame(draw);
      return () => {
        cancelAnimationFrame(timerId);
      };
    }
  });
};
