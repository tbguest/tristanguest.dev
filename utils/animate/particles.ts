import {
  createTexture,
  createBuffer,
  bindFramebuffer,
  bindAttribute,
  bindTexture,
} from "./util";

export type WindData = {
  image?: HTMLImageElement | ImageData;
  width: number;
  height: number;
  uMin: number;
  uMax: number;
  vMin: number;
  vMax: number;
};

type ShaderProgram = {
  [field: string]: unknown;
  //   u_screen?: number;
  //   u_opacity?: number;
  //   u_particles?: number;
  //   u_particles_res?: number;
  //   u_wind?: number;
  //   u_wind_min?: number;
  //   u_wind_max?: number;
  program: WebGLProgram | null;
};

export const getColorRamp = (colors: any) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 256;
  canvas.height = 1;

  if (ctx) {
    const gradient = ctx.createLinearGradient(0, 0, 256, 0);
    for (const stop in colors) {
      gradient.addColorStop(+stop, colors[stop]);
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 1);

    return new Uint8Array(ctx.getImageData(0, 0, 256, 1).data);
  }
};

export const resize = (gl: WebGLRenderingContext) => {
  const emptyPixels = new Uint8Array(gl.canvas.width * gl.canvas.height * 4);
  // screen textures to hold the drawn screen for the previous and the current frame
  const backgroundTexture = createTexture(
    gl,
    gl.NEAREST,
    emptyPixels,
    gl.canvas.width,
    gl.canvas.height
  );
  const screenTexture = createTexture(
    gl,
    gl.NEAREST,
    emptyPixels,
    gl.canvas.width,
    gl.canvas.height
  );

  return { backgroundTexture, screenTexture };
};

export const setWind = (gl: WebGLRenderingContext, windData: WindData) => {
  const windTexture = createTexture(
    gl,
    gl.LINEAR,
    windData.image,
    gl.canvas.width,
    gl.canvas.height
  );
  return windTexture;
};

export const setParticles = (
  gl: WebGLRenderingContext,
  numParticles: number
) => {
  // we create a square texture where each pixel will hold a particle position encoded as RGBA
  const particleRes = Math.ceil(Math.sqrt(numParticles));

  // Since the particle positions are tracked with a texture, there should n^2 particles
  const squareNumParticles = particleRes * particleRes;

  const particleState = new Uint8Array(squareNumParticles * 4);
  for (let i = 0; i < particleState.length; i++) {
    particleState[i] = Math.floor(Math.random() * 256); // random initial particle positions
  }

  // textures to hold the particle state for the current and the next frame
  const particleStateTexture0 = createTexture(
    gl,
    gl.NEAREST,
    particleState,
    particleRes,
    particleRes
  );
  const particleStateTexture1 = createTexture(
    gl,
    gl.NEAREST,
    particleState,
    particleRes,
    particleRes
  );

  const particleIndices = new Float32Array(squareNumParticles);
  for (let i = 0; i < squareNumParticles; i++) particleIndices[i] = i;
  const particleIndexBuffer = createBuffer(gl, particleIndices);

  return {
    particleStateResolution: particleRes,
    squareNumParticles,
    particleStateTexture0,
    particleStateTexture1,
    particleIndexBuffer,
  };
};

export const drawScreen = (
  gl: WebGLRenderingContext,
  framebuffer: WebGLFramebuffer | null,
  screenTexture: WebGLTexture | null,
  backgroundTexture: WebGLTexture | null,
  fadeOpacity: number,
  quadBuffer: WebGLFramebuffer | null,
  screenProgram: ShaderProgram | undefined,
  drawProgram: ShaderProgram | undefined,
  numParticles: number,
  particleIndexBuffer: WebGLFramebuffer | null,
  particleStateResolution: number,
  windData: WindData,
  colorRampTexture: WebGLTexture | null
) => {
  // draw the screen into a temporary framebuffer to retain it as the background on the next frame
  bindFramebuffer(gl, framebuffer, screenTexture);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  screenProgram &&
    drawTexture(gl, backgroundTexture, fadeOpacity, screenProgram, quadBuffer);
  drawParticles(
    gl,
    drawProgram,
    particleIndexBuffer,
    particleStateResolution,
    windData,
    numParticles,
    colorRampTexture
  );

  bindFramebuffer(gl, null);

  // enable blending to support drawing on top of an existing background (e.g. a map)
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  drawTexture(gl, screenTexture, 1.0, screenProgram, quadBuffer);
  gl.disable(gl.BLEND);

  // save the current screen as the background for the next frame
  const temp = backgroundTexture;
  backgroundTexture = screenTexture;
  screenTexture = temp;

  return { backgroundTexture, screenTexture };
};

const drawTexture = (
  gl: WebGLRenderingContext,
  texture: WebGLTexture | null,
  opacity: number,
  screenProgram: ShaderProgram,
  quadBuffer: WebGLFramebuffer | null
) => {
  const program = screenProgram;
  gl.useProgram(program.program);

  bindAttribute(gl, quadBuffer, program.a_pos, 2);
  bindTexture(gl, texture, 2);
  gl.uniform1i(program.u_screen, 2);
  gl.uniform1f(program.u_opacity, opacity);

  gl.drawArrays(gl.TRIANGLES, 0, 6);
};

const drawParticles = (
  gl: WebGLRenderingContext,
  program: ShaderProgram,
  particleIndexBuffer: WebGLFramebuffer | null,
  particleStateResolution: number,
  windData: WindData,
  numParticles: number,
  colorRampTexture: WebGLTexture | null
) => {
  gl.useProgram(program.program);

  bindAttribute(gl, particleIndexBuffer, program.a_index, 1);
  bindTexture(gl, colorRampTexture, 2);

  gl.uniform1i(program.u_wind, 0);
  gl.uniform1i(program.u_particles, 1);
  gl.uniform1i(program.u_color_ramp, 2);

  gl.uniform1f(program.u_particles_res, particleStateResolution);
  gl.uniform2f(program.u_wind_min, windData.uMin, windData.vMin);
  gl.uniform2f(program.u_wind_max, windData.uMax, windData.vMax);
  gl.uniform2f(program.u_wind_res, windData.width, windData.height);

  gl.drawArrays(gl.POINTS, 0, numParticles);
};

export const updateParticles = (
  gl: WebGLRenderingContext,
  framebuffer: WebGLFramebuffer | null,
  particleStateTexture0: WebGLTexture | null,
  particleStateTexture1: WebGLTexture | null,
  particleStateResolution: number,
  program: ShaderProgram | undefined,
  quadBuffer: WebGLFramebuffer | null,
  windData: WindData,
  speedFactor: number,
  dropRate: number,
  dropRateBump: number
) => {
  bindFramebuffer(gl, framebuffer, particleStateTexture1);
  gl.viewport(0, 0, particleStateResolution, particleStateResolution);

  if (program) {
    gl.useProgram(program.program);

    bindAttribute(gl, quadBuffer, program.a_pos, 2);

    gl.uniform1i(program.u_wind, 0);
    gl.uniform1i(program.u_particles, 1);

    gl.uniform1f(program.u_rand_seed, Math.random());
    gl.uniform2f(program.u_wind_res, windData.width, windData.height);
    gl.uniform2f(program.u_wind_min, windData.uMin, windData.vMin);
    gl.uniform2f(program.u_wind_max, windData.uMax, windData.vMax);
    gl.uniform1f(program.u_speed_factor, speedFactor);
    gl.uniform1f(program.u_drop_rate, dropRate);
    gl.uniform1f(program.u_drop_rate_bump, dropRateBump);
  }

  gl.drawArrays(gl.TRIANGLES, 0, 6);

  // swap the particle state textures so the new one becomes the current one
  const temp = particleStateTexture0;
  particleStateTexture0 = particleStateTexture1;
  particleStateTexture1 = temp;

  return { particleStateTexture0, particleStateTexture1 };
};
