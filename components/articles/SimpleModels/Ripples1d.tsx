import { useState } from "react";
import { LineAnimation } from "../../../components/content/canvas/LineAnimation";
import SegmentedControl from "../../../components/ui/SegmentedControl/SegmentedControl";
import { NX } from "../../../utils/ripple1d/constants";
import {
  evolve as evolveRipple,
  initialize as initializeRipple,
} from "../../../utils/ripple1d/model";
import { Slider } from "../../ui/Slider";

export type Transport = "windward" | "all" | "leeward";

export default function Ripples1d() {
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
      <LineAnimation
        initialState={initializeRipple(0.2)}
        iterator={(h) =>
          evolveRipple(
            h,
            windspeed,
            transport !== "all" ? transport : undefined
          )
        }
        latticeSize={NX}
        opts={{ yScale: 10, yOrigin: 50 }}
        canvasSize={{
          width: 600,
          height: 100,
        }}
      />
    </>
  );
}
