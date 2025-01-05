import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiLink } from "react-icons/fi";
import { ContentLayout } from "../../../components/layout/ContentLayout/ContentLayout";
import { spaceGrotesk } from "../../../fonts";
import { LATTICE_X } from "../../../utils/dune1d/constants";
import { initialize as initializeDune } from "../../../utils/dune1d/model";
import { NX } from "../../../utils/ripple1d/constants";
import { initialize as initializeRipple } from "../../../utils/ripple1d/model";
import { LineStatic } from "../../content/canvas/LineStatic";
import Dunes1d from "./Dunes1d";
import Dunes1dStack from "./Dunes1dStack";
import Ripples1d from "./Ripples1d";
import Ripples1dStack from "./Ripples1dStack";
import Ripples2d from "./Ripples2d";

export default function SimpleModels() {
  const router = useRouter();

  return (
    <ContentLayout title="Simple Models">
      <article className="flex flex-col gap-14">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <p>
              {`I have a soft spot for simple models that focus on "emergent
              phenomena" in physical systems rather than trying to capture
              underlying physics. Some simple models are useful — they can guide
              scientific inquiry as tests of phenomenological feasibility. Other
              models just look cool. Here is a collection of both.`}
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
            {`If we were trying to build a model that would simulate the formation
            of ripples in wind-blown sand, what are the most important things
            we'd need to capture? We could safely start with:`}
          </p>
          <ul className="flex flex-col gap-1 list-disc list-inside">
            <li>wind,</li>
            <li>sand, and</li>
            <li>conditions of transport.</li>
          </ul>

          <p>
            {`Those are pretty broad, but let's think about how we might treat
            each one in the most simple way possible.`}
          </p>

          <p>
            {`Remembering that we don't really want to be thinking at the scale of
            individual sand grains (this is a simple model), we could represent
            sand as a sort of "slab" on a grid, where for any given instance of
            transport, a slab of some height is moved from one grid cell to
            another.`}
          </p>

          <p>
            {`It would make sense to randomize the heights of the slabs somehow
            initially, adding small perturbations to an otherwise flat surface.
            Let's start in 1-d with a grid that has 100 cells.`}
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
            {`We can represent the wind simply by keeping it steady and
            one-directional. We'll make it "blow" from left to right.`}
          </p>

          <p>
            {`How does the wind interact with sand grains? How do the transport
            conditions change based on the position of a sand grain - for
            example, its elevation, or whether it's on a windward or leeward
            slope? We could assume that sand sitting at a higher elevation will
            be transported further, since it sticks up higher into the wind.`}
          </p>

          <p>
            {`For this model, let's assume that every "grain" (slab) has a takeoff
            and a landing point, so the amount of sand on our grid stays the
            same. We can think of this as a sort of "jump". Sand that moves
            beyond the edge of the grid is wrapped back to the beginning.`}
          </p>

          <p>
            {`So, the first mode of transport in our model is the "jumping" of
            slabs of sand in the direction of the wind, with slabs that are at a
            higher elevation being transported further than those that are
            lower.`}
          </p>

          <p>
            {`There's a second mode of transport that we need to include in our
            simple model. In reality, sandy slopes can only get so steep before
            grains cascade down-slope to a more stable position. We can
            implement this in our model by averaging the height of the sand at
            each grid cell with each of its nearest neighbouring cells - a
            "diffusion" step that keeps the sandy bed more smooth.`}
          </p>

          <p>
            {`That's it for our simple model. We'll interate over every grid cell,
            applying our "jump" condition followed by our smoothing condition.
            The model below is implemented in TypeScript and runs in your
            browser.`}
          </p>
          <p>
            {`You can try changing the transport condition between "all",
            "windward" only, and "leeward" only. In the "all" case, sand is
            transported from every cell during a model timestep. In the
            "windward" case, only slabs on windward slopes are allowed to move,
            and vice versa for the "leeward" case.`}
          </p>

          {/* Line animation */}
          <Ripples1d />

          <p>
            {`A nice ripple pattern emerges quickly when all grains are allowed to
            be moved from all of the cells.`}
          </p>

          <p>
            {`If we only allow slabs on windward slopes to be transported, the
            ripples propagate downwind, which we would expect ripples to to do
            in reality.`}
          </p>

          <p>
            {`In the leeward only case, the ripples propagate upwind. Not so
            realistic, but still interesting!`}
          </p>

          <p>
            {`Increasing the "wind" speed leads to ripples with longer
            wavelengths, which we also might expect in reality.`}
          </p>

          <p>
            {`It's a bit easier to see the ripples as cohesive structures if we
            can look at the time history. Here's a stacked view to help with
            that.`}
          </p>

          {/* Stacked animation */}
          <Ripples1dStack />

          <p>
            {`The 2-d model creates ripples that can be strikingly realistic.
            Running the model in 2-d is a bit more expensive to do on the fly,
            so I've shown these animations as gifs, pre-computed using Python.`}
          </p>

          {/* GIF animation */}
          <Ripples2d />

          <p>
            {`This is a "coupled map-lattice" model. The grid cells are discrete
            in space, but the values on the grid (the sand slabs) are allowed to
            vary continuously.`}
          </p>

          <p>
            {`It turns out that this model can be formalized mathematically in
            such a way that we can learn about its behaviour and stability
            analytically.`}
          </p>

          <p>
            {`The "jump" and "diffusion" steps are analogous to the terms in a
            reaction-diffusion system. In our case, the rippled pattern emerges
            spontaneously though instability that coincides with a critical
            "wind" stress.`}
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
              Sand dunes cellular automaton
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

          <p>
            {`We can use some of the same ideas from the ripple model above to
            think about the formation and evolution of sand dunes.`}
          </p>

          <p>
            {`Again, we'll represent the sand as "slabs" on a grid rather than
            considering individual grains, and the slabs will be moved from one
            grid cell to another by a steady wind stress.`}
          </p>

          <p>
            {`We'll randomize the intitial bed state, again in 1-d, only this
            time, we won't allow a negative number of slabs at any grid cell.
            The motivation here is to simulate a layer beneath the sand that
            can't be eroded. Think of this as a "bedrock" layer. To initialize
            the model, we'll randomly position a set amount of sand "slabs" on
            the grid. This time we'll use a 1000-cell grid.`}
          </p>

          {/* Draw an initial profile */}
          <LineStatic
            initialState={initializeDune()}
            latticeSize={LATTICE_X}
            opts={{ yScale: 0.5, yOrigin: 50 }}
            canvasSize={{
              width: 600,
              height: 100,
            }}
          />

          <p>
            {`We're going to use a different set of transport conditions that make
            more sense for the larger scale of sand dunes, and take into account
            the non-erodible "bedrock" layer.`}
          </p>

          <p>{`There are three elements that we'd like to capture:`}</p>
          <ul className="flex flex-col gap-1 list-disc list-inside">
            <li>
              {`sand should have a higher probability of being deposited on sand
              than on bedrock,`}
            </li>
            <li>
              {`sand should not be transported if it's in the "shadow" of a dune
              (out of the wind), and`}
            </li>
            <li>{`sand slopes shouldn't be unrealistically steep.`}</li>
          </ul>

          <p>
            {`We can select grid cells at random, and move the top slab of sand
            some distance downwind that's proportional to the windspeed. We'll
            assign probabilities of deposition to each type of substrate: a
            higher probability for sand and a lower probability for bedrock. If
            the grain doesn't get deposited, we'll move it downwind again, check
            for deposition, and so on until it gets deposited.`}
          </p>

          <p>
            {`To prevent transport of sand that's sheltered from the wind, we
            check if the selected cell is in the "shadow" of an upwind dune. We
            do this by drawing an imaginary line of some angle (I used 15°) from
            the selected cell upwind. If any upwind slabs rise above this line,
            the slab at the selected cell is considered sheltered and won't be
            transported.`}
          </p>

          <p>
            {`Finally, we'll add an "avalanching" step. After each instance of
            erosion or deposition, we'll check to make sure no slopes have
            exceeded our sand slope threshold (30°). If the angle threshold is
            exceeded, the topmost slab is moved down the steepest neighbouring
            slope until it reaches a stable position.`}
          </p>

          <p>{`Here's the model in action:`}</p>

          <Dunes1d />

          <p>
            {`Again, it's helpful to have some time history for context, so here's
            the same model with steps stacked through time.`}
          </p>

          <Dunes1dStack />

          <p>
            {`The model does a neat job of capturing some dune-like features. The
            sand slabs quickly self-organize into dune-shaped features that
            travel downwind. Smaller features travel faster than larger ones,
            and eventually most small features on the grid merge into larger,
            slower-moving ones.`}
          </p>

          <p>
            {`Of course, there are some ways we could try to make the model
            better. Real dunes are usually steeper on the downwind side. And
            what about different substrate types? Should we restrict the dunes'
            height in some way?`}
          </p>

          <p>{`I'll leave that for another time.`}</p>
        </div>
      </article>
    </ContentLayout>
  );
}
