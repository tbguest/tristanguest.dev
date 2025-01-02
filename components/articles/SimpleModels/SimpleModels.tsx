import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiLink } from "react-icons/fi";
import { LineAnimation } from "../../../components/content/canvas/LineAnimation";
import { StackAnimation } from "../../../components/content/canvas/StackAnimation";
import { ContentLayout } from "../../../components/layout/ContentLayout/ContentLayout";
import { spaceGrotesk } from "../../../fonts";
import { LATTICE_X } from "../../../utils/dune1d/constants";
import {
  evolve as evolveDune,
  initialize as initializeDune,
} from "../../../utils/dune1d/model";
import Ripples1d from "./Ripples1d";
import Ripples1dStack from "./Ripples1dStack";
import Ripples2d from "./Ripples2d";
import { NX } from "../../../utils/ripple1d/constants";
import { initialize as initializeRipple } from "../../../utils/ripple1d/model";
import { LineStatic } from "../../content/canvas/LineStatic";

export default function SimpleModels() {
  const router = useRouter();

  return (
    <ContentLayout
      title="Simple Models"
      subtitle="Recreating complex physical phenomena with simple models"
    >
      <article className="flex flex-col gap-14">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <p>
              I have a soft spot for simple models that focus on "emergent
              phenomena" in physical systems rather than trying to capture
              underlying physics. Some simple models are useful — they can guide
              scientific inquiry as tests of phenomenological feasibility. Other
              models just look cool. Here is a collection of both.
            </p>
          </div>

          <section>
            <ul className="flex flex-col gap-1 list-disc list-inside">
              <li>
                <Link href="#ripples" className="text-anchor">
                  Ripples in windblown sand
                </Link>
              </li>
              <li>
                <Link href="#dunes" className="text-anchor">
                  Sand dunes cellular automaton
                </Link>
              </li>
            </ul>
          </section>
        </div>

        {/* Ripples */}
        <div className="flex flex-col gap-4">
          <div>
            <h2
              id="ripples"
              className={classNames([
                spaceGrotesk.className,
                "font-black text-2xl mb-1",
                "group flex items-center gap-2",
              ])}
            >
              Ripples in wind-blown sand
              <a
                href="#ripples"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("#ripples", undefined, { shallow: true });
                }}
              >
                <FiLink size={20} className="hover:text-gray-500" />
              </a>
            </h2>
            <em className="text-gray-500 mb-6">
              Inspired by Nishimori and Ouchi (1993)
            </em>
          </div>

          <p>
            If we were trying to build a model that would simulate the formation
            of ripples in wind-blown sand, what are the most important things
            we'd need to capture? We could safely start with:
          </p>
          <ul className="flex flex-col gap-1 list-disc list-inside">
            <li>wind,</li>
            <li>sand, and</li>
            <li>conditions of transport.</li>
          </ul>

          <p>
            Those are pretty broad, but let's think about how we might treat
            each one in the most simple way possible.
          </p>

          <p>
            Remembering that we don't really want to be thinking at the scale of
            individual sand grains (this is a simple model), we could represent
            sand as a sort of "slab" on a grid, where for any given instance of
            transport, a slab of some height is moved from one grid cell to
            another.
          </p>

          <p>
            It would make sense to randomize the heights of the slabs somehow
            initially, adding small perturbations to an otherwise flat surface.
            Let's start in 1-d with a grid that has 100 cells.
          </p>

          {/* Draw an initial profile */}
          <LineStatic
            initialState={initializeRipple(0.2)}
            latticeSize={NX}
            opts={{ yScale: 10, yOrigin: 50 }}
            canvasSize={{
              width: 600,
              height: 100,
            }}
          />

          <p>
            We can represent the wind simply by keeping it steady and
            one-directional. We'll make it "blow" from left to right.
          </p>

          <p>
            How does the wind interact with sand grains? How do the transport
            conditions change based on the position of a sand grain - for
            example, its elevation, or whether it's on a windward or leeward
            slope? We could assume that sand sitting at a higher elevation will
            be transported further, since it sticks up higher into the wind.
          </p>

          <p>
            For this model, let's assume that every "grain" (slab) has a takeoff
            and a landing point, so the amount of sand on our grid stays the
            same. We can think of this as a sort of "jump". Sand that moves
            beyond the edge of the grid is wrapped back to the beginning.
          </p>

          <p>
            So, the first mode of transport in our model is the "jumping" of
            slabs of sand in the direction of the wind, with slabs that are at a
            higher elevation being transported further than those that are
            lower.
          </p>

          <p>
            There's a second mode of transport that we need to include in our
            simple model. In reality, sandy slopes can only get so steep before
            grains cascade from the top down-slope to a more stable position. We
            can implement this in our model by averaging the height of the sand
            at the landing cell of the "jump" with each of the nearest
            neighbouring cells - a "diffusion" step that keeps the sandy bed
            more smooth.
          </p>

          <p>
            That's it for our simple model. We'll interate over every grid cell,
            applying our "jump" condition followed by our smoothing condition.
            The model below is implemented in TypeScript and runs in your
            browser.
          </p>
          <p>
            You can try changing the transport condition between "all",
            "windward" only, and "leeward" only. In the "all" case, sand is
            transported from every cell during a model timestep. In the
            "windward" case, only slabs on windward slopes are allowed to move,
            and vice versa for the "leeward" case.
          </p>

          {/* Line animation */}
          <Ripples1d />

          <p>
            A nice ripple pattern emerges quickly when all grains are allowed to
            be moved from all of the cells.
          </p>

          <p>
            If we only allow slabs on windward slopes to be transported, the
            ripples propagate downwind, which we would expect ripples to to do
            in reality.
          </p>

          <p>
            In the leeward only case, the ripples propagate upwind. Not so
            realistic, but still interesting!
          </p>

          <p>
            Increasing the "wind" speed leads to ripples with longer
            wavelengths, which we also might expect in reality.
          </p>

          <p>
            It's a bit easier to see the ripples as cohesive structures if we
            can look at the time history. Here's a stacked view to help with
            that:
          </p>
          {/* Stacked animation */}
          <Ripples1dStack />

          <p>
            The 2-d model creates ripples that can be strikingly realistic.
            Running the model in 2-d is a bit more expensive to do on the fly,
            so I've shown these animations as gifs, pre-computed using Python.
          </p>

          {/* GIF animation */}
          <Ripples2d />

          <p>
            It turns out that this model can be formalized mathematically in
            such a way that we can learn about its behaviour and stability.
          </p>

          <p>
            The rippled pattern emerges spontaneously though instability that
            coincides with a critical "wind" stress.
          </p>

          <p>
            The "jump" step and the diffusion step represent reaction and
            diffusion in a classic reaction-diffusion system of equations which
            can be examined analytically to explore the sort of instabilities
            that lead to things like the formation of a ripple pattern.
          </p>

          <p>[equation]</p>

          <p>
            Saltation is a "nonlinear" reaction step, and surface creep is a
            diffusion step, such that the system behaves like a
            reaction-diffusion .. which are well-studied. Damped-driven systems
            often exhibit chaotic behaviour. In this case, an instability
            leading to ripple formation coincides with a critical wind stress.
          </p>

          <p>
            This is a "coupled map-lattice" model. The grid cells are discrete
            in space, but the values on the grid (the sand slabs) are allowed to
            vary continuously.
          </p>
        </div>

        {/* Dunes */}
        <div className="flex flex-col gap-4">
          <div>
            <h2
              id="dunes"
              className={classNames([
                spaceGrotesk.className,
                "font-black text-2xl mb-1",
                "group flex items-center gap-2",
              ])}
            >
              Dunes
              <a
                href="#dunes"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("#dunes", undefined, { shallow: true });
                }}
              >
                <FiLink size={20} className="hover:text-gray-500" />
              </a>
            </h2>
            <em className="text-gray-500 mb-6">Inspired by Werner (1995)</em>
          </div>

          <p>A cellular automaton approach to sand dune evolution in 1-d.</p>

          <p>
            {`Discrete "slabs" on a lattice self-organize into dune-like structures forced by "wind". The erosion and deposition of slabs are stochastically controlled, with additional contstraints from simulated "avalanching" and no-transport "shadow-zones".`}
          </p>

          <LineAnimation
            initialState={initializeDune()}
            iterator={evolveDune}
            latticeSize={LATTICE_X}
            opts={{
              yScale: 0.5,
              yOrigin: 50,
            }}
            canvasSize={{
              width: 600,
              height: 100,
            }}
          />

          <StackAnimation
            initialState={initializeDune()}
            iterator={evolveDune}
            latticeSize={LATTICE_X}
            skip={3 * LATTICE_X}
            stackOffset={-3}
            opts={{
              yScale: 0.5,
              yOrigin: 290,
            }}
          />
        </div>
      </article>
    </ContentLayout>
  );
}
