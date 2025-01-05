import { useRef, useState } from "react";
import { ContentLayout } from "../../../components/layout/ContentLayout/ContentLayout";
import { useParticleAnimation } from "../../../hooks/content/use-particle-animation";

export type GyreModel = "gulfStream" | "stommel" | "stommelBeta" | "munk";

export default function GulfStream() {
  const [model] = useState<GyreModel>("gulfStream");
  const screenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useParticleAnimation(model as GyreModel, screenCanvasRef.current);

  return (
    <ContentLayout
      title="Why is there a Gulf Stream?"
      subtitle="Fun with geophysical fluid dynamics (and your GPU)"
    >
      <article className="flex flex-col gap-8">
        <div className="flex relative items-center justify-center px-5 md:px-20 py-5">
          <canvas
            width="600"
            height="400"
            ref={screenCanvasRef}
            style={{ display: "none" }}
          ></canvas>
          <canvas
            className="flex flex-1 max-w-full"
            width="600"
            height="400"
            ref={screenCanvasRef}
          ></canvas>
        </div>
        <p>
          {`I'm working on this - come back another day. In the mean time, get in
          touch if this is interesting to you :)`}
        </p>
        {/* <button onClick={() => setModel("gulfStream")}>Gulf Stream</button>
        <button onClick={() => setModel("stommel")}>Stommel</button>
        <button onClick={() => setModel("stommelBeta")}>
          Stommel with variable f
        </button>
        <button onClick={() => setModel("munk")}>Munk</button> */}
      </article>
    </ContentLayout>
  );
}
