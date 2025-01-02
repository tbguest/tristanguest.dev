export const stommel = () => {
  // Parameters
  const Lx = 6000; // Basin length
  const Ly = 3000; // Basin width
  const dx = 10; // Spatial step in x-direction
  const dy = 10; // Spatial step in y-direction
  const beta = 2e-11; // Beta parameter
  const K = 2e-6;
  const T = 9.7e-11;
  const h = 0.0001;

  // Grid dimensions
  const Nx = Math.floor(Lx / dx);
  const Ny = Math.floor(Ly / dy);

  // Initial conditions
  const u = new Array(Ny).fill(0).map(() => new Array(Nx).fill(0));
  const v = new Array(Ny).fill(0).map(() => new Array(Nx).fill(0));
  const psi = new Array(Ny).fill(0).map(() => new Array(Nx).fill(0));

  const a1 =
    -beta / (2 * K) + Math.sqrt((beta / (2 * K)) ** 2 + (Math.PI / Ly) ** 2);
  const a2 =
    -beta / (2 * K) - Math.sqrt((beta / (2 * K)) ** 2 + (Math.PI / Ly) ** 2);

  for (let i = 0; i < Nx; i++) {
    const x = i * dx;
    for (let j = 0; j < Ny; j++) {
      const y = j * dy;
      psi[j][i] =
        ((Ly * T) / (Math.PI * K)) *
        (1 -
          ((1 - Math.E ** (a2 * Lx)) * Math.E ** (a1 * x) -
            (1 - Math.E ** (a1 * Lx)) * Math.E ** (a2 * x)) /
            (Math.E ** (a1 * Lx) - Math.E ** (a2 * Lx))) *
        Math.sin((Math.PI * y) / Ly);
    }
  }

  let max = 0;
  for (let i = 0; i < Nx - 1; i++) {
    for (let j = 0; j < Ny - 1; j++) {
      u[j][i] = -((1 / h) * (psi[j + 1][i] - psi[j][i])) / dy;
      v[j][i] = ((1 / h) * (psi[j][i + 1] - psi[j][i])) / dx;
      const speed = Math.sqrt(u[j][i] * u[j][i] + v[j][i] * v[j][i]);
      if (speed > max) {
        max = speed;
      }
    }
  }

  return { u, v, max };
};

export const stommelBeta = () => {
  // Parameters
  const Lx = 6000; // Basin length
  const Ly = 3000; // Basin width
  const dx = 10; // Spatial step in x-direction
  const dy = 10; // Spatial step in y-direction
  // const beta = 2e-11; // Beta parameter
  const K = 2e-6;
  const T = 9.7e-11;
  const h = 0.0001;
  const omega = 7.2921e-5;
  const RE = 6371; // Radius of Earth

  // Grid dimensions
  const Nx = Math.floor(Lx / dx);
  const Ny = Math.floor(Ly / dy);

  // Initial conditions
  const u = new Array(Ny).fill(0).map(() => new Array(Nx).fill(0));
  const v = new Array(Ny).fill(0).map(() => new Array(Nx).fill(0));
  const psi = new Array(Ny).fill(0).map(() => new Array(Nx).fill(0));

  for (let j = 0; j < Ny; j++) {
    const y = j * dy;
    const phi = (15 * Math.PI) / 180 + (0.01 * y * Math.PI) / 180;
    const beta = (2 * omega * Math.cos(phi)) / RE;
    for (let i = 0; i < Nx; i++) {
      const x = i * dx;
      const a1 =
        -beta / (2 * K) +
        Math.sqrt((beta / (2 * K)) ** 2 + (Math.PI / Ly) ** 2);
      const a2 =
        -beta / (2 * K) -
        Math.sqrt((beta / (2 * K)) ** 2 + (Math.PI / Ly) ** 2);

      psi[j][i] =
        ((Ly * T) / (Math.PI * K)) *
        (1 -
          ((1 - Math.E ** (a2 * Lx)) * Math.E ** (a1 * x) -
            (1 - Math.E ** (a1 * Lx)) * Math.E ** (a2 * x)) /
            (Math.E ** (a1 * Lx) - Math.E ** (a2 * Lx))) *
        Math.sin((Math.PI * y) / Ly);
    }
  }

  let max = 0;
  for (let i = 0; i < Nx - 1; i++) {
    for (let j = 0; j < Ny - 1; j++) {
      u[j][i] = -((1 / h) * (psi[j + 1][i] - psi[j][i])) / dy;
      v[j][i] = ((1 / h) * (psi[j][i + 1] - psi[j][i])) / dx;
      const speed = Math.sqrt(u[j][i] * u[j][i] + v[j][i] * v[j][i]);
      if (speed > max) {
        max = speed;
      }
    }
  }

  return { u, v, max };
};
