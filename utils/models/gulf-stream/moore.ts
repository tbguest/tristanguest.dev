// import { allRoots } from "flo-poly";
// import { polynomialRoot } from "mathjs";

export const moore = () => {
  // Parameters
  const Lx = 5000; // Basin length
  const Ly = 2000; // Basin width
  const dx = 10; // Spatial step in x-direction
  const dy = 10; // Spatial step in y-direction
  // const beta = 2e-11; // Beta parameter
  const beta = 1e-13; // Beta parameter

  // moore
  const w0 = 1;
  const pi = Math.PI;
  const p = 0.001; // > 0
  const q = 0.01; //

  // Grid dimensions
  const Nx = Math.floor(Lx / dx);
  const Ny = Math.floor(Ly / dy);

  // Initialize
  const u = new Array(Ny).fill(0).map(() => new Array(Nx).fill(0));
  const v = new Array(Ny).fill(0).map(() => new Array(Nx).fill(0));
  const psi = new Array(Ny).fill(0).map(() => new Array(Nx).fill(0));

  // Re = uL/v
  // From AEH: 5 = 0.126*5000/v
  // => v = 0.008
  // const nu = 1000e-6;
  // const nu = 1000e7;
  // const U0 = 0.126e-3;
  // const U0 = 10e-2;

  const U0 = 0.1; // m/s

  // Solve for the viscosity given a Re number of 5
  // const nu = U0 ** (3 / 2) / (5 * beta ** (1 / 2));
  const nu = 2e2;
  // console.log("nu", nu);

  const U = new Array(Ny).fill(0);

  // This is common to cases 1 and 2
  const a = (w0 * pi) / (beta * Ly);

  let max = 0;
  for (let j = 0; j < Ny - 1; j++) {
    const y = j * dy;

    const Uc = (27 / 4) ** (1 / 3) * beta ** (1 / 3) * nu ** (2 / 3);

    U[j] = U0 * Math.cos((pi * y) / Ly);

    console.log(U[j]);

    const regime = U[j] >= Uc ? "case 1" : "case 2";
    // console.log("regime", regime);

    // Coefficients for the polynomial equation solver
    const coefficients = [nu, -U[j], 0, beta];
    // const lambda = allRoots(coefficients);
    // const lambda = allRoots(coefficients).reverse();
    // const lambda = polynomialRoot(beta, 0, -U[j], nu);
    const lambda = [1, 2, 3]; // TODO: remove. This is just for TS

    let lambda1 = 0;
    let lambda2 = 0;
    let lambda3 = 0;
    if (lambda.length === 3) {
      lambda1 = lambda[0];
      lambda2 = lambda[1];
      lambda3 = lambda[2];
    } else {
      lambda3 = lambda[0];
    }

    // Display the roots
    console.log("lambdas", lambda);
    // console.log("U[j]", U[j]);
    console.log("y", y);

    for (let i = 0; i < Nx - 1; i++) {
      const x = i * dx;

      // if (y < Ly / 2) {
      if (U[j] >= Uc) {
        // Case 1
        psi[j][i] =
          a *
          (x +
            ((lambda2 * lambda3 * Lx + lambda2 - lambda3) /
              (lambda3 * (lambda2 - lambda1))) *
              Math.E ** (-lambda1 * x) +
            ((lambda1 * lambda3 * Lx + lambda1 + lambda3) /
              (lambda3 * (lambda1 - lambda2))) *
              Math.E ** (-lambda2 * x) +
            (1 / lambda3) * Math.E ** (lambda3 * (Lx - x)) -
            Lx -
            1 / lambda3) *
          Math.sin((pi * y) / Ly);
        // u[j][i] = U[j];
        // v[j][i] = 0;
        // u[j][i] = psi[j][i];
        // v[j][i] = psi[j][i];
      } else {
        // Case 2
        psi[j][i] =
          a *
          (x +
            (Lx + 1 / lambda3) * Math.E ** (-p * x) * Math.cos(q * x) +
            (-1 / q +
              (p * Lx) / q +
              (p / (q * lambda3)) * Math.E ** (-p * x) * Math.sin(q * x) -
              Lx -
              1 / lambda3 +
              (1 / lambda3) * Math.E ** (lambda3 * (Lx - x)))) *
          Math.sin((pi * y) / Ly);
        // u[j][i] = U[j];
        // v[j][i] = 0;
        // u[j][i] = psi[j][i];
        // v[j][i] = psi[j][i];
      }

      // u[j][i] = (psiLower[j + 1][i] - psiLower[j][i]) / dy;
      // v[j][i] = -(psiLower[j][i + 1] - psiLower[j][i]) / dx;
      // u[j][i] = (psiUpper[j + 1][i] - psiUpper[j][i]) / dy;
      // v[j][i] = -(psiUpper[j][i + 1] - psiUpper[j][i]) / dx;
      u[j][i] = (psi[j + 1][i] - psi[j][i]) / dy;
      v[j][i] = -(psi[j][i + 1] - psi[j][i]) / dx;
      const speed = Math.sqrt(u[j][i] * u[j][i] + v[j][i] * v[j][i]);
      if (speed > max) {
        max = speed;
      }
    }
    // console.log(psiLower);
    // console.log("psi[0][0]", psi[0][0]);
    // console.log("psi[0][0]", psi);
  }
  return { u, v, max };
};
