import { useState } from "react";
import { NX } from "../../../utils/ripple1d/constants";
import {
  evolve as evolveRipple,
  initialize as initializeRipple,
} from "../../../utils/ripple1d/model";
import { StackAnimation } from "../../content/canvas/StackAnimation";
import SegmentedControl from "../../ui/SegmentedControl/SegmentedControl";
import { Transport } from "./Ripples1d";
import { Slider } from "../../ui/Slider";

export default function Ripples1dStack() {
  const [transport, setTransport] = useState<Transport>("all");
  const [windspeed, setWindspeed] = useState<number>(5);

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-2 lg:gap-8">
        <SegmentedControl
          options={["windward", "all", "leeward"]}
          value={transport}
          onChange={(value) => {
            setTransport(value as Transport);
          }}
        />
        <Slider label="wind speed" value={windspeed} onChange={setWindspeed} />
      </div>
      <StackAnimation
        initialState={initializeRipple(0.2)}
        iterator={(h) =>
          evolveRipple(
            h,
            windspeed,
            transport !== "all" ? transport : undefined
          )
        }
        latticeSize={NX}
        stackOffset={2}
        opts={{ yScale: 10, yOrigin: 50 }}
      />
    </>
  );
}
