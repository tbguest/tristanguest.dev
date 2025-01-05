import { useState } from "react";
import { LATTICE_X } from "../../../utils/dune1d/constants";
import { evolve, initialize } from "../../../utils/dune1d/model";
import { LineAnimation } from "../../content/canvas/LineAnimation";
import { Slider } from "../../ui/Slider";

export default function Dunes1d() {
  const [windspeed, setWindspeed] = useState<number>(15);

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:justify-end gap-2 lg:gap-8">
        <Slider
          label="wind speed"
          value={windspeed}
          onChange={setWindspeed}
          min={5}
          max={20}
        />
      </div>
      <LineAnimation
        initialState={initialize()}
        iterator={(h) => evolve(h, windspeed)}
        latticeSize={LATTICE_X}
        opts={{
          yScale: 0.5,
          yOrigin: 50,
        }}
        skip={3000}
        canvasSize={{
          width: 600,
          height: 100,
        }}
      />
    </>
  );
}
