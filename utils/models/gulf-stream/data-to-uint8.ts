export const dataToUint8 = ({
  u,
  v,
  max,
}: {
  u: number[][];
  v: number[][];
  max: number;
}) => {
  const width = u[0].length;
  const height = u.length;
  const imgData = new ImageData(width, height);

  //   const max = 2; // For Stommel // TODO
  // const max = 200000; // For Munk

  const min = -max;

  // Encode u and v data into red and green channels, respectively
  for (let y = 0; y < height; y++) {
    // Image origin is upper left, so we'll flip the y velocity array
    const yp = height - y - 1;
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      imgData.data[index] = (255 * (u[yp][x] - min)) / (max - min); // Red channel (u data)
      imgData.data[index + 1] = (255 * (v[yp][x] - min)) / (max - min); // Green channel (v data)
      imgData.data[index + 2] = 255;
      imgData.data[index + 3] = 255;
    }
  }
  return imgData;
};
