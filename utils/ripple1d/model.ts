import { B, D, NX, Q } from "./constants";

export function initialize(roughness: number) {
  const initialState = [];
  for (let i = 0; i < NX; i++) {
    initialState.push(roughness * Math.random());
  }
  return initialState;
}

export function saltate(
  hs: number[],
  L: number,
  b: number,
  nx: number,
  noTransport?: "leeward" | "windward"
) {
  const slopes = [];
  for (let j = 0; j < nx; j++) {
    // Let's introduce a slope condition where the grain only moves if it's on the "upwind" side of the slope
    const jprevious = j === 0 ? nx - 1 : j - 1;
    const jnext = j === nx - 1 ? 0 : j + 1;
    const slope = hs[jnext] - hs[jprevious];

    // If there's no transport on the leeward side, then the grain only moves if the slope is positive.
    // If there's no transport on the windward side, then the grain only moves if the slope is negative.
    const transportCondition =
      noTransport === "leeward"
        ? slope > 0
        : noTransport === "windward"
          ? slope < 0
          : slope;
    if (transportCondition) {
      let jump = Math.floor(L + b * hs[j]);
      jump = jump < 0 ? 0 : jump;
      hs[j] = hs[j] - Q;
      if (j + jump < nx) {
        hs[j + jump] = hs[j + jump] + Q;
      } else {
        const wrap = j + jump - nx;
        hs[wrap] = hs[wrap] + Q;
      }
    }
    slopes.push(slope);
  }

  return { h: hs, slopes };
}

export function diffuse(h: number[]) {
  // Init a temp array of sums
  const nnSum = [];
  for (let i = 0; i < NX; i++) {
    nnSum.push(0.0);
  }

  // Boundaries
  nnSum[0] = (h[1] + h[NX - 1]) / 2;
  nnSum[NX - 1] = (h[NX - 2] + h[0]) / 2;

  // Body
  for (let i = 1; i < NX - 1; i++) {
    nnSum[i] = (h[i - 1] + h[i + 1]) / 2;
  }

  // Average
  for (let i = 0; i < NX; i++) {
    h[i] = h[i] + D * (nnSum[i] - h[i]);
  }

  return h;
}

export function evolve(
  h: number[],
  windspeed: number,
  noTransport?: "leeward" | "windward"
) {
  const { h: saltated, slopes } = saltate(h, windspeed, B, NX, noTransport);
  return { h: diffuse(saltated), slope: slopes };
}
