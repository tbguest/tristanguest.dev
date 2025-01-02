import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { ContentLayout } from "../../../components/layout/ContentLayout/ContentLayout";
import { useParticleAnimation } from "../../../hooks/content/use-particle-animation";

// TODO
export const meta = () => {
  return [
    { title: "Instability I/O" },
    {
      name: "Instability I/O",
      content: "Exploring simple physical models with JavaScript",
    },
  ];
};

export default function GulfStream() {
  const [model, setModel] = useState("gulfStream");
  const screenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useParticleAnimation(model, screenCanvasRef.current);

  return (
    <ContentLayout
      title="Why is there a Gulf Stream?"
      subtitle="Fun with geophysical fluid dynamics (and your GPU)"
      path="/content/gulf-stream"
    >
      <article className="flex flex-col gap-8">
        <div className="flex relative items-center justify-center px-20 py-5">
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
        <button onClick={() => setModel("gulfStream")}>Gulf Stream</button>
        <button onClick={() => setModel("stommel")}>Stommel</button>
        <button onClick={() => setModel("stommelBeta")}>
          Stommel with variable f
        </button>
        <button onClick={() => setModel("munk")}>Munk</button>
      </article>
    </ContentLayout>
  );
}
