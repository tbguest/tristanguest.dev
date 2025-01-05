export const munk = () => {
  // Parameters
  const Lx = 6000000; // Basin length [m]
  const Ly = 3000000; // Basin width [m]
  const xMin = 0; //
  const yMin = -Ly / 2;
  const dx = 10000; // Spatial step in x-direction
  const dy = 10000; // Spatial step in y-direction
  const beta = 2e-11; // Beta parameter
  const T = 9.7e-11;
  // const omega = 7.2921e-5;
  // const RE = 6371; // Radius of Earth

  // munk
  const rho = 1024; // kg/m^3
  const aH = 5e3; // m^2/s
  const k = (beta / aH) ** (1 / 3);
  const B = 2 / Math.sqrt(3) - Math.sqrt(3) / (k * Lx);

  // Grid dimensions
  const Nx = Math.floor(Lx / dx);
  const Ny = Math.floor(Ly / dy);

  // Initialize
  const u = new Array(Ny).fill(0).map(() => new Array(Nx).fill(0));
  const v = new Array(Ny).fill(0).map(() => new Array(Nx).fill(0));
  const psi = new Array(Ny).fill(0).map(() => new Array(Nx).fill(0));

  for (let i = 0; i < Nx; i++) {
    const x = i * dx + xMin;

    const chi =
      -B *
        Math.E ** ((-k * x) / 2) *
        Math.cos(
          (Math.sqrt(3) / 2) * k * x + Math.sqrt(3) / (2 * k * Lx) - Math.PI / 6
        ) +
      1 -
      (1 / (k * Lx)) * (k * x - Math.E ** (-k * (Lx - x)) - 1);

    for (let j = 0; j < Ny; j++) {
      // Munk set the origin mid-domain
      const y = j * dy + yMin;
      // const taux = -rho * T * Math.cos((Math.PI * y) / Ly); TODO: Should this have the -ve?
      const taux = rho * T * Math.cos((Math.PI * y) / Ly);
      psi[j][i] = ((-Lx * chi) / beta) * taux;
    }
  }

  let max = 0;
  for (let i = 0; i < Nx - 1; i++) {
    for (let j = 0; j < Ny - 1; j++) {
      u[j][i] = (psi[j + 1][i] - psi[j][i]) / dy;
      v[j][i] = -(psi[j][i + 1] - psi[j][i]) / dx;
      const speed = Math.sqrt(u[j][i] * u[j][i] + v[j][i] * v[j][i]);
      if (speed > max) {
        max = speed;
      }
    }
  }

  return { u, v, max };
};
