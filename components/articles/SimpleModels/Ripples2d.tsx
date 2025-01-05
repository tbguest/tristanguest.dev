import { useState } from "react";
import SegmentedControl from "../../ui/SegmentedControl/SegmentedControl";
import { Transport } from "./Ripples1d";

export default function Ripples2d() {
  const [transport, setTransport] = useState<Transport>("all");

  const src =
    transport === "all"
      ? "/assets/content/ripples.gif"
      : transport === "leeward"
        ? "/assets/content/ripples-no-transport-downhill.gif"
        : "/assets/content/ripples-no-transport-uphill.gif";

  return (
    <>
      <SegmentedControl
        options={[
          { value: "windward", label: "leeward only" },
          { value: "all", label: "all" },
          { value: "leeward", label: "windward only" },
        ]}
        value={transport}
        onChange={(value) => {
          setTransport(value as Transport);
        }}
      />
      <div className="flex relative items-center justify-center px-5 md:px-20 py-5">
        <img
          src={src}
          alt="Ripple formation animation"
          className="w-full shadow-lg max-w-[400px]"
        />
      </div>
    </>
  );
}
