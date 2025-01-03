import { useState } from "react";
import { LATTICE_X } from "../../../utils/dune1d/constants";
import { evolve, initialize } from "../../../utils/dune1d/model";
import { StackAnimation } from "../../content/canvas/StackAnimation";
import { Slider } from "../../ui/Slider";

export default function Dunes1dStack() {
  const [windspeed, setWindspeed] = useState<number>(15);

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:justify-end gap-2 lg:gap-8">
        <Slider
          label="wind speed"
          value={windspeed}
          onChange={setWindspeed}
          min={5}
          max={25}
          step={5}
        />
      </div>
      <StackAnimation
        initialState={initialize()}
        iterator={(h) => evolve(h, windspeed)}
        latticeSize={LATTICE_X}
        skip={3 * LATTICE_X}
        stackOffset={-3}
        opts={{
          yScale: 0.5,
          yOrigin: 290,
        }}
      />
    </>
  );
}
